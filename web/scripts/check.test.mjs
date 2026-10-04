import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createSiteI18n } from '../src/i18n/index.ts';
import { languageFromUrl, languageHref, pageHref } from '../src/i18n/url.ts';

test('Japanese is the default, even without browser-language detection', () => {
  assert.equal(createSiteI18n().resolvedLanguage, 'ja');
  for (const query of ['', '?lang=ja', '?lang=fr', '?lang=', '?lang=../../en']) {
    assert.equal(languageFromUrl(new URL(`https://example.com/${query}`)), 'ja');
  }
  assert.equal(languageFromUrl(new URL('https://example.com/?lang=en')), 'en');
});

test('language links preserve the page, other query parameters and anchors', () => {
  const url = new URL('https://example.com/works.html?ref=a%26b#gallery');
  assert.equal(languageHref(url, 'en'), '/works.html?ref=a%26b&lang=en#gallery');
  assert.equal(languageHref(new URL('https://example.com/works.html?ref=a%26b&lang=en#gallery'), 'ja'), '/works.html?ref=a%26b#gallery');
  assert.equal(url.searchParams.has('lang'), false);
  assert.equal(pageHref('/news.html', 'en'), '/news.html?lang=en');
  assert.equal(pageHref('/news.html', 'ja'), '/news.html');
});

test('Japanese supplies missing or empty English translations', () => {
  const instance = createSiteI18n('en');
  assert.equal(instance.t('home.greeting'), 'Hello!!');
  delete instance.getResourceBundle('en', 'translation').home.greeting;
  assert.equal(instance.t('home.greeting'), "I'm NOGI !");
  instance.addResource('en', 'translation', 'home.greeting', '');
  assert.equal(instance.t('home.greeting'), "I'm NOGI !");
});

test('Storybook instances cannot change each other or the site resources', async () => {
  const japanese = createSiteI18n();
  const english = createSiteI18n('en');
  english.addResource('en', 'translation', 'home.greeting', '');
  await english.changeLanguage('ja');
  assert.equal(japanese.resolvedLanguage, 'ja');
  assert.equal(createSiteI18n('en').t('home.greeting'), 'Hello!!');
});

test('English keys and interpolation placeholders follow the Japanese source', () => {
  const ja = JSON.parse(readFileSync(new URL('../src/i18n/ja.json', import.meta.url), 'utf8'));
  const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));
  function compare(source, translated, path = '') {
    for (const [key, value] of Object.entries(translated)) {
      const current = `${path}.${key}`;
      assert.ok(Object.hasOwn(source, key), `English-only translation key: ${current}`);
      if (typeof value === 'object') compare(source[key], value, current);
      else {
        assert.equal(typeof source[key], 'string', current);
        assert.deepEqual([...value.matchAll(/\{\{(.*?)\}\}/g)].map((m) => m[1]).sort(),
          [...source[key].matchAll(/\{\{(.*?)\}\}/g)].map((m) => m[1]).sort(), current);
      }
    }
  }
  compare(ja, en);
});
