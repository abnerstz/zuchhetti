import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { ThemeProvider } from '@/contexts';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div>
          <Story />
          <div style={{ padding: '32px' }}>
            <h2>Conteúdo da Página</h2>
            <p>Este é um exemplo de como o Header aparece com conteúdo abaixo dele.</p>
            <p>
              Experimente alternar entre os temas claro e escuro usando o botão no canto superior
              direito.
            </p>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};
