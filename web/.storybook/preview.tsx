import { useMemo } from 'react';
import type { Preview } from '@storybook/react-vite';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';
import { createSiteI18n, type Language } from '../src/i18n';
import '../src/styles/site.css';

const preview: Preview = {
  globalTypes: {
    locale: { description: '表示言語', toolbar: {
      icon: 'globe', dynamicTitle: true,
      items: [{ value: 'ja', title: '日本語' }, { value: 'en', title: 'English' }],
    } },
  },
  initialGlobals: { locale: 'ja' },
  decorators: [(Story, context) => {
    // Each story gets its own instance: switching one canvas cannot affect another.
    const i18n = useMemo(() => {
      const instance = createSiteI18n(context.globals.locale as Language);
      if (context.parameters.missingEnglish) instance.addResource('en', 'translation', 'home.greeting', '');
      return instance;
    }, [context.globals.locale, context.parameters.missingEnglish]);
    return <I18nextProvider i18n={i18n}><MemoryRouter initialEntries={context.parameters.initialEntries ?? ['/']}><Story /></MemoryRouter></I18nextProvider>;
  }],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
  },
};
export default preview;
