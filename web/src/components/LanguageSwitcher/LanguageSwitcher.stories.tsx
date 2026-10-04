import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta = {
  title: 'Components/LanguageSwitcher', component: LanguageSwitcher, tags: ['autodocs'],
  args: { currentUrl: '/works?ref=portfolio#gallery', onLanguageChange: fn() },
} satisfies Meta<typeof LanguageSwitcher>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const SwitchToEnglish: Story = {
  play: async ({ canvasElement, args }) => {
    const english = within(canvasElement).getByRole('link', { name: 'English' });
    await expect(english).toHaveAttribute('href', '/works?ref=portfolio&lang=en#gallery');
    await userEvent.click(english);
    await expect(english).toHaveAttribute('aria-current', 'true');
    await expect(args.onLanguageChange).toHaveBeenCalledWith('en');
  },
};
