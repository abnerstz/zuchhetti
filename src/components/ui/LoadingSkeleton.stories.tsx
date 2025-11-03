import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSkeleton, LoadingCard } from './LoadingSkeleton';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';

const meta = {
  title: 'UI/LoadingSkeleton',
  component: LoadingSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Número de linhas do skeleton',
    },
    columns: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Número de colunas do skeleton',
    },
  },
  decorators: [
    (Story) => (
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table>
          <TableBody>
            <Story />
          </TableBody>
        </Table>
      </TableContainer>
    ),
  ],
} satisfies Meta<typeof LoadingSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 5,
    columns: 4,
  },
};

export const SmallTable: Story = {
  args: {
    rows: 3,
    columns: 3,
  },
};

export const LargeTable: Story = {
  args: {
    rows: 10,
    columns: 6,
  },
};

export const SingleColumn: Story = {
  args: {
    rows: 8,
    columns: 1,
  },
};

// Story para LoadingCard
export const Card = {
  render: () => (
    <Paper sx={{ width: 400 }}>
      <LoadingCard />
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componente LoadingCard para uso em cards e containers.',
      },
    },
  },
};
