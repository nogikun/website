import { useEffect } from 'react';
import { Link, Navigate, Route, Routes, matchPath, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { Language } from './i18n';
import { languageFromUrl, languageHref, pageHref } from './i18n/url';
import { SiteHeader } from './components/SiteHeader/SiteHeader';
import { ArtworkGallery } from './components/ArtworkGallery/ArtworkGallery';
import { ExternalEmbed } from './components/ExternalEmbed/ExternalEmbed';
import { artworks } from './data/artworks';
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { SocialPage } from './pages/SocialPage';

const pages = [
  // hidden: true でメニューのみ非表示。ページのURLやページ一覧は残ります。
  { id: 'home', path: '/', legacyPath: '/index.html', hidden: false },
  { id: 'works', path: '/works', legacyPath: '/works.html', hidden: false },
  { id: 'news', path: '/news', legacyPath: '/news.html', hidden: false },
  { id: 'sns', path: '/sns', legacyPath: '/sns.html', hidden: false },
  { id: 'lives', path: '/lives', legacyPath: '/lives.html', hidden: true },
  { id: 'requestedworks', path: '/requestedworks', legacyPath: '/requestedworks.html', hidden: true },
  { id: 'ask', path: '/ask', legacyPath: '/ask.html', hidden: true },
  { id: 'tree', path: '/pages', legacyPath: '/fileTree/fileTree.html', hidden: false },
] as const;
const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf85ZRMFTfF9l7uUT_edYCHxYr4ji17L-m20wAV5N89mZKrXQ/viewform?usp=sf_link';

export function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUrl = location.pathname + location.search + location.hash;
  const language = languageFromUrl(new URL(currentUrl, window.location.origin));
  const page = pages.find((item) => matchPath(item.path, location.pathname) || matchPath(item.legacyPath, location.pathname));
  const title = page ? t(`nav.${page.id}`) : t('notFound.title');
  const links = pages.map((item) => ({ href: pageHref(item.path, language), label: t(`nav.${item.id}`), hidden: item.hidden }));

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [i18n, language]);

  useEffect(() => {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `禾｜${title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('site.description'));
  }, [language, title, t]);

  function changeLanguage(next: Language) {
    const href = languageHref(new URL(currentUrl, window.location.origin), next);
    if (href !== currentUrl) void navigate(href);
  }

  return <>
    <SiteHeader homeHref={pageHref('/', language)} items={[...links,
      { label: t('nav.profile'), href: 'https://linktr.ee/nogikun', hidden: false },
      { label: t('nav.blog'), href: 'https://onogikun.hatenablog.com/', hidden: false }]}
      currentUrl={currentUrl} onLanguageChange={changeLanguage} />
    <main className="site-main">
      {page?.id !== 'home' && <h1 className="page-title">{title}</h1>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<div id="gallery"><ArtworkGallery artworks={artworks} /></div>} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/sns" element={<SocialPage />} />
        <Route path="/requestedworks" element={<p>{t('requestedworks.intro')}</p>} />
        <Route path="/lives" element={<>
          <ExternalEmbed title={t('embed.liveTitle')} src="https://twitcasting.tv/nogikun_/embeddedplayer/live?auto_play=false&default_mute=true" link="https://twitcasting.tv/nogikun_" />
          <p>{t('lives.service')}</p><a href="https://twitcasting.tv/nogikun_">{t('lives.watch')}</a>
        </>} />
        <Route path="/ask" element={<ExternalEmbed title={t('embed.formTitle')} src={formUrl} link={formUrl} kind="form" />} />
        <Route path="/pages" element={<ul className="page-list">{links.map((link) => <li key={link.href}><Link to={link.href}>{link.label}</Link></li>)}</ul>} />
        {pages.map((item) => <Route key={item.legacyPath} path={item.legacyPath}
          element={<Navigate replace to={item.path + location.search + location.hash} />} />)}
        <Route path="*" element={<p>{t('notFound.message')} <Link to={pageHref('/', language)}>{t('nav.home')}</Link></p>} />
      </Routes>
    </main>
  </>;
}
