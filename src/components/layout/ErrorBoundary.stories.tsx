import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';
import { Button } from '@mui/material';
import { useState } from 'react';

// Componente que força um erro quando clicado
function ErrorTrigger() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Este é um erro simulado para testar o ErrorBoundary');
  }

  return (
    <div style={{ padding: '32px', textAlign: 'center' }}>
      <h2>Componente Funcional</h2>
      <p>Clique no botão abaixo para simular um erro:</p>
      <Button variant="contained" color="error" onClick={() => setShouldError(true)}>
        Disparar Erro
      </Button>
    </div>
  );
}

// Componente que não dispara erro
function HealthyComponent() {
  return (
    <div style={{ padding: '32px', textAlign: 'center' }}>
      <h2>Componente Saudável</h2>
      <p>Este componente está funcionando perfeitamente!</p>
      <p>Nenhum erro foi detectado.</p>
    </div>
  );
}

const meta = {
  title: 'Layout/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Healthy: Story = {
  args: {
    children: <HealthyComponent />,
  },
};

export const WithError: Story = {
  args: {
    children: <ErrorTrigger />,
  },
};
