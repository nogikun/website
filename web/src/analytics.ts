// Keep the existing GA4 property used by the legacy site.
export const measurementId = 'G-YPELGCKR6R';
const scriptId = 'site-google-analytics';

type AnalyticsWindow = Pick<Window, 'location' | 'document'> & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function analyticsEnabled(production: boolean, hostname: string) {
  return production && (hostname === 'nogikun.com' || hostname === 'www.nogikun.com');
}

export function initializeAnalytics(browser: AnalyticsWindow, production: boolean) {
  if (!analyticsEnabled(production, browser.location.hostname)) return;
  // React StrictMode may run mount effects twice. Load/configure the tag once.
  if (browser.document.getElementById(scriptId)) return;

  browser.dataLayer ??= [];
  browser.gtag ??= function (..._args: unknown[]) { browser.dataLayer!.push(arguments); };
  browser.gtag('js', new Date());
  // GA4 enhanced measurement handles history changes; do not send manual views.
  browser.gtag('config', measurementId);

  const script = browser.document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  browser.document.head.appendChild(script);
}
