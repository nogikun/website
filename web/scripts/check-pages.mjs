import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { setTimeout } from 'node:timers/promises';

export const sha256 = (body) => createHash('sha256').update(body).digest('hex');

// Only same-origin resources in the generated HTML are deployment requirements.
export function assetPaths(html) {
  const paths = [...html.matchAll(/(?:src|href)="(\/[^"?#]+)(?:[?#][^"]*)?"/g)].map((match) => match[1]);
  assert.ok(paths.some((path) => /^\/assets\/.+\.js$/.test(path)), 'Missing built JavaScript');
  assert.ok(paths.some((path) => /^\/assets\/.+\.css$/.test(path)), 'Missing built stylesheet');
  assert.ok(html.includes('<div id="root"></div>'), 'Missing React root');
  assert.ok(!html.includes('/src/main.tsx'), 'Source HTML was uploaded instead of the build');
  return [...new Set(paths)];
}

export async function checkArtifact(directory) {
  const index = await readFile(resolve(directory, 'index.html'));
  const fallback = await readFile(resolve(directory, '404.html'));
  assert.deepEqual(fallback, index, '404.html must match index.html for Pages SPA routing');
  for (const path of assetPaths(index.toString('utf8'))) {
    assert.ok(!path.split('/').includes('..'), `Invalid asset path: ${path}`);
    const body = await readFile(resolve(directory, path.slice(1)));
    assert.ok(body.length > 0, `Empty asset: ${path}`);
  }
  return sha256(index);
}

export async function checkDeployment(baseUrl, expectedHash) {
  assert.match(expectedHash ?? '', /^[a-f0-9]{64}$/, 'Expected build SHA-256 is required');
  const base = new URL(baseUrl);
  assert.ok(['https:', 'http:'].includes(base.protocol), 'Pages URL must use HTTP(S)');
  assert.equal(base.pathname, '/', 'This site requires a root domain');

  async function get(path, status, contentType) {
    const url = new URL(path, base);
    url.searchParams.set('deployment', expectedHash);
    const response = await fetch(url, { signal: AbortSignal.timeout(10_000), cache: 'no-store' });
    assert.equal(response.status, status, `${path}: unexpected HTTP status`);
    assert.match(response.headers.get('content-type') ?? '', contentType, `${path}: wrong content type`);
    const body = Buffer.from(await response.arrayBuffer());
    assert.ok(body.length > 0, `${path}: empty response`);
    return body;
  }

  const index = await get('/', 200, /text\/html/i);
  assert.equal(sha256(index), expectedHash, 'Published HTML does not match this build');
  await Promise.all(assetPaths(index.toString('utf8')).map((path) => get(path, 200,
    path.endsWith('.js') ? /(?:javascript|ecmascript)/i
      : path.endsWith('.css') ? /text\/css/i : /image\//i)));

  // Pages serves the SPA shell with HTTP 404 for direct access to these routes.
  await Promise.all(['/works?lang=en', '/news', '/sns', '/lives', '/requestedworks', '/ask', '/pages',
    '/works.html?ref=deployment&lang=en', '/fileTree/fileTree.html'].map(async (path) => {
    const fallback = await get(path, 404, /text\/html/i);
    assert.equal(sha256(fallback), expectedHash, `${path}: wrong SPA fallback`);
  }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.includes('--deployed')) {
    // Allow a short delay for Pages/CDN propagation, then fail the workflow.
    for (let attempt = 1; ; attempt++) {
      try {
        await checkDeployment(process.env.PAGES_URL, process.env.EXPECTED_INDEX_SHA256);
        console.log('Published HTML, assets and direct-route fallbacks match this build.');
        break;
      } catch (error) {
        if (attempt >= 6) throw error;
        console.warn(`Deployment check ${attempt}/6 failed: ${error.message}`);
        await setTimeout(15_000);
      }
    }
  } else {
    const hash = await checkArtifact(resolve('dist'));
    console.log(`Pages artifact verified: ${hash}`);
  }
}
