import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState } from './ErrorState';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do estado de erro',
    },
    description: {
      control: 'text',
      description: 'Descrição do erro',
    },
    onRetry: {
      description: 'Callback executado ao clicar em "Tentar Novamente"',
    },
  },
  args: {
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const NetworkError: Story = {
  args: {
    title: 'Erro de conexão',
    description: 'Verifique sua conexão com a internet e tente novamente.',
  },
};

export const ServerError: Story = {
  args: {
    title: 'Erro no servidor',
    description: 'Ocorreu um erro no servidor. Estamos trabalhando para resolver.',
  },
};

export const NotFound: Story = {
  args: {
    title: 'Página não encontrada',
    description: 'A página que você está procurando não existe ou foi removida.',
  },
};

export const WithoutRetry: Story = {
  args: {
    title: 'Acesso negado',
    description: 'Você não tem permissão para acessar este recurso.',
    onRetry: undefined,
  },
};
