import type { Meta, StoryObj } from '@storybook/react';
import { UserFormDialog } from './UserFormDialog';
import { User } from '@/types/user.types';
import { fn } from '@storybook/test';

const mockUser: User = {
  id: 1,
  name: 'João Silva',
  email: 'joao.silva@example.com',
  status: 'active',
};

const meta = {
  title: 'Users/UserFormDialog',
  component: UserFormDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    open: true,
    onClose: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof UserFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewUser: Story = {
  args: {
    user: null,
    isLoading: false,
  },
};

export const EditUser: Story = {
  args: {
    user: mockUser,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    user: mockUser,
    isLoading: true,
  },
};

export const InactiveUser: Story = {
  args: {
    user: {
      ...mockUser,
      status: 'inactive',
    },
    isLoading: false,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    user: null,
    isLoading: false,
  },
};
