import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router';
import { createSiteI18n } from './i18n';
import { languageFromUrl } from './i18n/url';
import { App } from './App';
import './styles/site.css';

const i18n = createSiteI18n(languageFromUrl(new URL(window.location.href)));

createRoot(document.getElementById('root')!).render(
  <StrictMode><I18nextProvider i18n={i18n}><BrowserRouter><App /></BrowserRouter></I18nextProvider></StrictMode>,
);
