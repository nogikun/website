import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { expect, userEvent, within } from 'storybook/test';
import { SiteHeader, type SiteHeaderProps } from './SiteHeader';

const meta = {
  title: 'Components/SiteHeader', component: SiteHeader, tags: ['autodocs'],
  args: { homeHref: '/', items: [{ label: '作品', href: '/works' }], currentUrl: '/' },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
function LocalizedHeader(args: SiteHeaderProps) {
  const { t } = useTranslation();
  return <SiteHeader {...args} items={[{ label: t('nav.works'), href: '/works' }, { label: t('nav.news'), href: '/news' }]} />;
}
export const Default: Story = { render: (args) => <LocalizedHeader {...args} /> };
export const OpenMenu: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /メニューを開く|Open menu/ }));
    const dialog = canvas.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /メニューを閉じる|Close menu/ }));
    await expect(dialog).not.toHaveAttribute('open');
    await expect(canvas.getByRole('button', { name: /メニューを開く|Open menu/ })).toHaveAttribute('aria-expanded', 'false');
  },
};
export const Expanded: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /メニューを開く|Open menu/ }));
    await expect(canvas.getByRole('dialog')).toHaveAttribute('open');
    await expect(canvas.getByRole('button', { name: /メニューを閉じる|Close menu/ })).toHaveAttribute('aria-expanded', 'true');
  },
};
