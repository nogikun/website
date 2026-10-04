import type { Language } from './index';

export function languageFromUrl(url: URL): Language {
  return url.searchParams.get('lang') === 'en' ? 'en' : 'ja';
}

export function languageHref(url: URL, language: Language): string {
  const next = new URL(url);
  if (language === 'ja') next.searchParams.delete('lang');
  else next.searchParams.set('lang', language);
  return next.pathname + next.search + next.hash;
}

export function pageHref(path: string, language: Language): string {
  return path + (language === 'en' ? '?lang=en' : '');
}
