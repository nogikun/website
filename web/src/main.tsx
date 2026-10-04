import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router';
import { createSiteI18n } from './i18n';
import { languageFromUrl } from './i18n/url';
import { App } from './App';
import { initializeAnalytics } from './analytics';
import './styles/site.css';

const i18n = createSiteI18n(languageFromUrl(new URL(window.location.href)));

// Mounted only by the site entry point, never by Storybook. App updates the
// initial document title before this sibling's effect initializes the tag.
function SiteAnalytics() {
  useEffect(() => initializeAnalytics(window, import.meta.env.PROD), []);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><I18nextProvider i18n={i18n}><BrowserRouter><App /><SiteAnalytics /></BrowserRouter></I18nextProvider></StrictMode>,
);
