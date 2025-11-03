import type { Meta, StoryObj } from '@storybook/react';
import { UserFilters } from './UserFilters';
import { fn } from '@storybook/test';
import { Box } from '@mui/material';

const meta = {
  title: 'Users/UserFilters',
  component: UserFilters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    onSearchChange: fn(),
  },
} satisfies Meta<typeof UserFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    search: '',
  },
};

export const WithSearch: Story = {
  args: {
    search: 'João',
  },
};

export const WithLongSearch: Story = {
  args: {
    search: 'joao.silva@example.com',
  },
};
