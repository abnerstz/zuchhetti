import type { Meta, StoryObj } from '@storybook/react';
import { UserTable } from './UserTable';
import { User } from '@/types/user.types';
import { fn } from '@storybook/test';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@example.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    status: 'active',
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@example.com',
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    status: 'active',
  },
  {
    id: 5,
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@example.com',
    status: 'inactive',
  },
];

const meta = {
  title: 'Users/UserTable',
  component: UserTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    sortField: {
      control: 'select',
      options: ['id', 'name', 'email', 'status'],
    },
    sortOrder: {
      control: 'select',
      options: ['asc', 'desc'],
    },
  },
  args: {
    onSort: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onRetry: fn(),
  },
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    users: mockUsers,
    sortField: 'id',
    sortOrder: 'asc',
    isLoading: false,
    isError: false,
  },
};

export const Loading: Story = {
  args: {
    users: [],
    sortField: 'id',
    sortOrder: 'asc',
    isLoading: true,
    isError: false,
  },
};

export const Empty: Story = {
  args: {
    users: [],
    sortField: 'id',
    sortOrder: 'asc',
    isLoading: false,
    isError: false,
  },
};

export const Error: Story = {
  args: {
    users: [],
    sortField: 'id',
    sortOrder: 'asc',
    isLoading: false,
    isError: true,
  },
};

export const SortedByName: Story = {
  args: {
    users: [...mockUsers].sort((a, b) => a.name.localeCompare(b.name)),
    sortField: 'name',
    sortOrder: 'asc',
    isLoading: false,
    isError: false,
  },
};

export const SortedByEmail: Story = {
  args: {
    users: [...mockUsers].sort((a, b) => a.email.localeCompare(b.email)),
    sortField: 'email',
    sortOrder: 'asc',
    isLoading: false,
    isError: false,
  },
};

export const SingleUser: Story = {
  args: {
    users: [
      {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@example.com',
        status: 'active',
      },
    ],
    sortField: 'id',
    sortOrder: 'asc',
    isLoading: false,
    isError: false,
  },
};

export const ManyUsers: Story = {
  args: {
    users: [
      ...mockUsers,
      {
        id: 6,
        name: 'Fernanda Lima',
        email: 'fernanda.lima@example.com',
        status: 'active',
      },
      {
        id: 7,
        name: 'Ricardo Alves',
        email: 'ricardo.alves@example.com',
        status: 'active',
      },
      {
        id: 8,
        name: 'Juliana Pereira',
        email: 'juliana.pereira@example.com',
        status: 'inactive',
      },
      {
        id: 9,
        name: 'Roberto Souza',
        email: 'roberto.souza@example.com',
        status: 'active',
      },
      {
        id: 10,
        name: 'Patrícia Martins',
        email: 'patricia.martins@example.com',
        status: 'active',
      },
    ],
    sortField: 'id',
    sortOrder: 'asc',
    isLoading: false,
    isError: false,
  },
};
