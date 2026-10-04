import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomePage } from './HomePage';

const meta = { title: 'Pages/HomePage', component: HomePage, tags: ['autodocs'] } satisfies Meta<typeof HomePage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Japanese: Story = { globals: { locale: 'ja' } };
export const English: Story = { globals: { locale: 'en' } };
export const JapaneseFallback: Story = { globals: { locale: 'en' }, parameters: { missingEnglish: true } };
