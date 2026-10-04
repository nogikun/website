import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import type { Language } from '../i18n';
import { pageHref } from '../i18n/url';

export function HomePage() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as Language;
  return <div className="home-page">
    <img className="home-illustration" src="/images/mainBackground.png" alt={t('home.imageAlt')} />
    <h1>{t('home.greeting')}</h1>
    <nav className="home-links" aria-label={t('nav.home')}>
      <Link to={pageHref('/works', language)}>{t('nav.works')}</Link>
      <a href="https://linktr.ee/nogikun">{t('nav.profile')}</a>
      <a href="https://onogikun.hatenablog.com/">{t('nav.blog')}</a>
    </nav>
    <section className="home-introduction" aria-labelledby="intro-title">
      <h2 id="intro-title">-{t('home.heading')}-</h2>
      <p>{t('home.intro')}</p><p>{t('home.hello')}</p><p>{t('home.name')}</p>
      <p>{t('home.study')}</p><p>{t('home.drawing')}</p>
      <p>{t('home.social')} <a href="https://twitter.com/nogikun_">@nogikun_</a></p>
      <p className="introduction-gap">{t('home.gallery')}</p><p>{t('home.welcome')}</p>
    </section>
  </div>;
}
