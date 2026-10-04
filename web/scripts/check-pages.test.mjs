import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { checkArtifact, checkDeployment, sha256 } from './check-pages.mjs';

const html = '<div id="root"></div><script src="/assets/app.js"></script><link href="/assets/app.css">';

test('Pages artifact rejects missing assets and an incorrect SPA fallback', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'website-pages-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(join(directory, 'assets'));
  await writeFile(join(directory, 'index.html'), html);
  await writeFile(join(directory, '404.html'), html);
  await writeFile(join(directory, 'assets/app.js'), 'console.log("site")');
  await writeFile(join(directory, 'assets/app.css'), 'body{}');
  assert.equal(await checkArtifact(directory), sha256(html));
  await writeFile(join(directory, '404.html'), 'GitHub default 404');
  await assert.rejects(checkArtifact(directory), /404.html must match/);
  await writeFile(join(directory, '404.html'), html);
  await rm(join(directory, 'assets/app.js'));
  await assert.rejects(checkArtifact(directory), /ENOENT/);
});

test('Deployment check catches stale HTML, broken assets and incorrect direct routes', async (t) => {
  let failure;
  const paths = new Set();
  const server = createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const path = url.pathname;
    paths.add(path);
    assert.equal(url.searchParams.get('deployment'), sha256(html));
    if (path.startsWith('/assets/')) {
      response.writeHead(failure === 'asset' ? 404 : 200, {
        'content-type': path.endsWith('.js') ? 'text/javascript' : 'text/css',
      });
      response.end('asset');
    } else {
      response.writeHead(path === '/' || failure === 'status' ? 200 : 404, { 'content-type': 'text/html' });
      response.end(failure === 'stale' || (failure === 'fallback' && path !== '/') ? 'Old site' : html);
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
    server.closeAllConnections();
  }));
  const url = `http://127.0.0.1:${server.address().port}/`;
  await checkDeployment(url, sha256(html));
  for (const path of ['/assets/app.js', '/assets/app.css', '/works', '/pages', '/works.html', '/fileTree/fileTree.html']) {
    assert.ok(paths.has(path), `Unchecked URL: ${path}`);
  }
  for (const [mode, message] of [['stale', /does not match this build/], ['asset', /unexpected HTTP status/],
    ['status', /unexpected HTTP status/], ['fallback', /wrong SPA fallback/]]) {
    failure = mode;
    await assert.rejects(checkDeployment(url, sha256(html)), message);
  }
});
