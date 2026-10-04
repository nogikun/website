import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, userEvent, within, expect } from 'storybook/test';
import { useTranslation } from 'react-i18next';
import { Button, type ButtonProps } from './Button';

const meta = {
  title: 'Components/Button', component: Button, tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { label: 'Button', onClick: fn() },
  argTypes: { backgroundColor: { control: 'color' }, color: { control: 'color' },
    size: { control: 'select', options: ['small', 'medium', 'large'] } },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { primary: true },
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: args.label }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};
export const Secondary: Story = {};
export const Large: Story = { args: { size: 'large' } };
export const Small: Story = { args: { size: 'small' } };
export const Disabled: Story = { args: { disabled: true } };
export const OriginalProps: Story = {
  args: { primary: true, label: '旧ButtonのProps', width: 240, height: 64, borderRadius: 24 },
};
function TranslatedButton(args: ButtonProps) {
  const { t } = useTranslation();
  return <Button {...args} label={t('button.sample')} />;
}
export const Translated: Story = { render: (args) => <TranslatedButton {...args} /> };
