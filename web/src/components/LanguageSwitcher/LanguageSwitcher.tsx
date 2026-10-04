import { useTranslation } from 'react-i18next';
import type { Language } from '../../i18n';
import { languageHref } from '../../i18n/url';

export interface LanguageSwitcherProps {
  currentUrl?: string;
  onLanguageChange?: (language: Language) => void;
}

export function LanguageSwitcher({ currentUrl = window.location.href, onLanguageChange }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  return (
    <nav className="language-switcher" aria-label={t('language.label')}>
      {(['ja', 'en'] as const).map((language) => (
        <a key={language} href={languageHref(new URL(currentUrl, window.location.origin), language)}
          lang={language} aria-current={i18n.resolvedLanguage === language ? 'true' : undefined}
          onClick={(event) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            void i18n.changeLanguage(language);
            onLanguageChange?.(language);
          }}>{t(`language.${language}`)}</a>
      ))}
    </nav>
  );
}
