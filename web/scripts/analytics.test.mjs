import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { analyticsEnabled, initializeAnalytics, measurementId } from '../src/analytics.ts';

test('analytics is enabled only for production builds on the public domain', () => {
  for (const hostname of ['nogikun.com', 'www.nogikun.com']) {
    assert.equal(analyticsEnabled(true, hostname), true);
    assert.equal(analyticsEnabled(false, hostname), false);
  }
  for (const hostname of ['localhost', '127.0.0.1', 'nogikun.github.io', 'preview.nogikun.com', 'nogikun.com.example.org']) {
    assert.equal(analyticsEnabled(true, hostname), false);
    // Disabled initialization must not even access the document or data layer.
    const browser = { location: { hostname } };
    initializeAnalytics(browser, true);
    assert.equal(browser.dataLayer, undefined);
  }
  initializeAnalytics({ location: { hostname: 'nogikun.com' } }, false);
});

test('the tag reuses the legacy property and initializes once without manual page views', () => {
  const legacy = readFileSync(new URL('../../legacy/index.html', import.meta.url), 'utf8');
  assert.equal(measurementId, legacy.match(/gtag\('config', '([^']+)'\)/)[1]);
  const scripts = [];
  const browser = {
    location: { hostname: 'nogikun.com' },
    document: {
      getElementById: (id) => scripts.find((script) => script.id === id),
      createElement: (tag) => { assert.equal(tag, 'script'); return {}; },
      head: { appendChild: (script) => scripts.push(script) },
    },
  };
  initializeAnalytics(browser, true);
  initializeAnalytics(browser, true);
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].async, true);
  assert.equal(scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
  const commands = browser.dataLayer.map((command) => Array.from(command));
  assert.equal(commands.length, 2);
  assert.equal(commands[0][0], 'js');
  assert.ok(commands[0][1] instanceof Date);
  assert.deepEqual(commands[1], ['config', measurementId]);
  assert.ok(!commands.some(([command]) => command === 'event'), 'Automatic and manual page views must not be mixed');
});
