import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ExternalEmbed } from './ExternalEmbed';

const meta = {
  title: 'Components/ExternalEmbed', component: ExternalEmbed, tags: ['autodocs'],
  args: { title: '配信プレビュー', src: 'about:blank', link: 'https://twitcasting.tv/nogikun_' },
} satisfies Meta<typeof ExternalEmbed>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Loaded: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button'));
    await expect(canvasElement.querySelector('iframe')).toHaveAttribute('src', 'about:blank');
  },
};
