# Storybook - Zucchetti

Este projeto utiliza Storybook para documentação e desenvolvimento isolado de componentes.

## Scripts Disponíveis

```bash
# Inicia o Storybook em modo desenvolvimento
yarn storybook

# Cria build de produção do Storybook
yarn build-storybook
```

## Estrutura

O Storybook está configurado para:

- ✅ Suportar React + Vite
- ✅ Tema Material-UI (claro e escuro)
- ✅ React Query para componentes que precisam de estado global
- ✅ Addons: Essentials, A11y, Interactions
- ✅ Documentação automática (autodocs)

## Stories Criadas

### Componentes UI
- `EmptyState` - Estados vazios com ações opcionais
- `ErrorState` - Estados de erro com retry
- `LoadingSkeleton` - Skeletons para tabelas
- `LoadingCard` - Skeletons para cards

### Componentes de Layout
- `Header` - Cabeçalho da aplicação com toggle de tema
- `ErrorBoundary` - Componente para captura de erros

### Componentes de Usuários
- `UserTable` - Tabela de usuários com ordenação
- `UserFormDialog` - Formulário de criação/edição
- `UserFilters` - Campo de busca
- `DeleteConfirmDialog` - Diálogo de confirmação de exclusão

## Como Criar Novas Stories

1. Crie um arquivo `*.stories.tsx` ao lado do componente
2. Use o template:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MeuComponente } from './MeuComponente';

const meta = {
  title: 'Categoria/MeuComponente',
  component: MeuComponente,
  parameters: {
    layout: 'centered', // ou 'fullscreen', 'padded'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MeuComponente>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // props do componente
  },
};
```

## Decorators Disponíveis

O Storybook já está configurado com:

- **Material-UI Theme Provider** - Todos os componentes têm acesso ao tema
- **React Query Provider** - Para componentes que usam hooks de query
- **Theme Switcher** - Alternar entre tema claro e escuro na toolbar

## Addons Instalados

- `@storybook/addon-essentials` - Controls, Actions, Docs, etc.
- `@storybook/addon-a11y` - Testes de acessibilidade
- `@storybook/addon-interactions` - Testes de interação
- `@storybook/addon-links` - Navegação entre stories

