import type { Meta, StoryObj } from '@storybook/react';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { User } from '@/types/user.types';
import { fn } from '@storybook/test';

const mockUser: User = {
  id: 1,
  name: 'João Silva',
  email: 'joao.silva@example.com',
  status: 'active',
};

const meta = {
  title: 'Users/DeleteConfirmDialog',
  component: DeleteConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    open: true,
    user: mockUser,
    onClose: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof DeleteConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const DifferentUser: Story = {
  args: {
    user: {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      status: 'inactive',
    },
    isLoading: false,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    isLoading: false,
  },
};
