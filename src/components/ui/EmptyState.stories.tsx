import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import SearchIcon from '@mui/icons-material/Search';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do estado vazio',
    },
    description: {
      control: 'text',
      description: 'Descrição do estado vazio',
    },
    actionLabel: {
      control: 'text',
      description: 'Label do botão de ação',
    },
    onAction: {
      description: 'Callback executado ao clicar no botão de ação',
    },
    icon: {
      description: 'Ícone customizado para o estado vazio',
    },
  },
  args: {
    onAction: fn(),
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithAction: Story = {
  args: {
    title: 'Nenhum usuário encontrado',
    description: 'Adicione um novo usuário para começar.',
    actionLabel: 'Adicionar Usuário',
  },
};

export const SearchEmpty: Story = {
  args: {
    title: 'Nenhum resultado',
    description: 'Não encontramos nada com os filtros aplicados.',
    actionLabel: 'Limpar Filtros',
    icon: <SearchIcon sx={{ fontSize: 60, color: '#667eea' }} />,
  },
};

export const FolderEmpty: Story = {
  args: {
    title: 'Pasta vazia',
    description: 'Não há arquivos nesta pasta ainda.',
    actionLabel: 'Upload de Arquivo',
    icon: <FolderOpenIcon sx={{ fontSize: 60, color: '#667eea' }} />,
  },
};

export const WithoutAction: Story = {
  args: {
    title: 'Sem dados disponíveis',
    description: 'Os dados serão carregados em breve.',
  },
};
