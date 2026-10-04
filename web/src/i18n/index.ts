import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import ja from './ja.json' with { type: 'json' };
import en from './en.json' with { type: 'json' };

export type Language = 'ja' | 'en';

// Japanese defines the keys accepted by useTranslation throughout the site.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof ja };
  }
}

export function createSiteI18n(language: Language = 'ja') {
  const instance = createInstance();
  void instance.use(initReactI18next).init({
    resources: structuredClone({ ja: { translation: ja }, en: { translation: en } }),
    lng: language,
    fallbackLng: 'ja',
    supportedLngs: ['ja', 'en'],
    returnEmptyString: false,
    initAsync: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}
