import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ArtworkGallery } from './ArtworkGallery';
import { artworks } from '../../data/artworks';

const meta = {
  title: 'Components/ArtworkGallery', component: ArtworkGallery, tags: ['autodocs'],
  args: { artworks },
} satisfies Meta<typeof ArtworkGallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const SelectArtwork: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fish = canvas.getByRole('button', { name: /🐟/ });
    await userEvent.click(fish);
    await expect(fish).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByRole('link', { name: /X/ })).toHaveAttribute('href', artworks[1].postUrl);
  },
};
export const Empty: Story = { args: { artworks: [] } };
export const BrokenImage: Story = { args: { artworks: [{ ...artworks[0], image: '/missing-artwork.jpg' }] } };
