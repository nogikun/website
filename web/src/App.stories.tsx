import type { Meta, StoryObj } from '@storybook/react-vite';
import { useLocation } from 'react-router';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { App } from './App';

function RoutedSite() {
  const location = useLocation();
  return <><App /><output aria-label="Current URL">{location.pathname + location.search + location.hash}</output></>;
}

const meta = {
  title: 'Pages/App', component: App, render: () => <RoutedSite />,
  parameters: { layout: 'fullscreen' }, globals: { locale: 'ja' },
} satisfies Meta<typeof App>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Navigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('link', { name: '作品' }));
    await expect(canvas.getByRole('heading', { name: '作品', level: 1 })).toBeVisible();
    await expect(canvas.getByLabelText('Current URL')).toHaveTextContent('/works');
    await userEvent.click(canvas.getByRole('button', { name: /🐟/ }));
    await userEvent.click(canvas.getByRole('link', { name: 'English' }));
    await expect(canvas.getByRole('button', { name: /🐟/ })).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByLabelText('Current URL')).toHaveTextContent('/works?lang=en');
    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));
    await userEvent.click(canvas.getByRole('link', { name: 'News' }));
    await expect(canvas.getByRole('heading', { name: 'News', level: 1 })).toBeVisible();
    await expect(canvas.getByLabelText('Current URL')).toHaveTextContent('/news?lang=en');
    await expect(canvas.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  },
};

export const LegacyUrl: Story = {
  parameters: { initialEntries: ['/works.html?ref=portfolio&lang=en#gallery'] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByLabelText('Current URL')).toHaveTextContent('/works?ref=portfolio&lang=en#gallery'));
    await expect(canvas.getByRole('heading', { name: 'Artworks', level: 1 })).toBeVisible();
    await userEvent.click(canvas.getByRole('link', { name: '日本語' }));
    await expect(canvas.getByLabelText('Current URL')).toHaveTextContent('/works?ref=portfolio#gallery');
    await expect(canvas.getByRole('heading', { name: '作品', level: 1 })).toBeVisible();
  },
};

export const NotFound: Story = {
  parameters: { initialEntries: ['/missing-page?lang=en'] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByRole('heading', { name: 'Page not found', level: 1 })).toBeVisible());
    await userEvent.click(canvas.getByRole('link', { name: 'HOME' }));
    await expect(canvas.getByRole('heading', { name: 'Hello!!', level: 1 })).toBeVisible();
    await expect(canvas.getByLabelText('Current URL')).toHaveTextContent('/?lang=en');
  },
};
