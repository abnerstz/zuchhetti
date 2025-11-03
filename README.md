# 🚀 Painel de Gestão de Usuários

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)
![MUI](https://img.shields.io/badge/Material_UI-6.1-007FFF?style=for-the-badge&logo=mui)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Uma aplicação moderna e completa para gerenciamento de usuários com operações CRUD, desenvolvida seguindo as melhores práticas do mercado.

[Demo ao Vivo](#) • [Documentação](#funcionalidades) • [Instalação](#instalação)

</div>

---

## 📋 Índice

- [Sobre](#sobre)
- [Stack Tecnológica](#stack-tecnológica)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Decisões Técnicas](#decisões-técnicas)
- [Testes](#testes)
- [CI/CD](#cicd)
- [Melhorias Futuras](#melhorias-futuras)
- [Licença](#licença)

---

## 📖 Sobre

Este projeto é um **Painel de Gestão de Usuários** desenvolvido como desafio técnico, demonstrando proficiência em desenvolvimento React moderno com TypeScript. A aplicação oferece uma interface intuitiva para realizar operações CRUD completas em usuários, com integração a uma API REST.

### 🎯 Objetivos Alcançados

✅ Código TypeScript 100% tipado (zero `any`)  
✅ Componentes funcionais com React Hooks  
✅ Gerenciamento de estado do servidor com React Query  
✅ Validação de formulários com Zod + React Hook Form  
✅ Interface responsiva e acessível com Material-UI  
✅ Dark mode persistente  
✅ Testes automatizados com cobertura > 70%  
✅ CI/CD configurado com GitHub Actions  
✅ Código limpo seguindo princípios SOLID

---

## 🛠 Stack Tecnológica

### Core

- **[React 18.3](https://react.dev/)** - Biblioteca para interfaces
- **[TypeScript 5.6](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Vite 5.4](https://vitejs.dev/)** - Build tool ultrarrápido

### Gerenciamento de Estado e Dados

- **[React Query (TanStack Query) 5.59](https://tanstack.com/query)** - Gerenciamento de estado assíncrono
- **[React Context API](https://react.dev/reference/react/useContext)** - Estado global para tema
- **[Axios 1.7](https://axios-http.com/)** - Cliente HTTP com interceptors

### Formulários e Validação

- **[React Hook Form 7.53](https://react-hook-form.com/)** - Gerenciamento de formulários performático
- **[Zod 3.23](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração Zod + React Hook Form

### UI/UX

- **[Material-UI (MUI) v6](https://mui.com/)** - Biblioteca de componentes React
- **[Material Icons](https://mui.com/material-ui/material-icons/)** - Ícones do Material Design
- **[Emotion](https://emotion.sh/)** - CSS-in-JS para estilização
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications modernas

### Qualidade de Código

- **[ESLint 9](https://eslint.org/)** - Linter JavaScript/TypeScript com flat config
- **[TypeScript ESLint](https://typescript-eslint.io/)** - Regras TypeScript para ESLint
- **[Prettier 3.3](https://prettier.io/)** - Formatador de código
- **[Husky 9](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Lint apenas de arquivos staged

### Testes

- **[Jest 30](https://jestjs.io/)** - Framework de testes com jsdom
- **[React Testing Library 16](https://testing-library.com/react)** - Testes de componentes
- **[MSW 2 (Mock Service Worker)](https://mswjs.io/)** - Mock de API em nível de rede
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro)** - Simulação de interações do usuário
- **[SWC](https://swc.rs/)** - Transpilador rápido para Jest

---

## ✨ Funcionalidades

### 📊 Listagem de Usuários

- ✅ Tabela responsiva com dados completos
- ✅ Ordenação por qualquer coluna (ID, Nome, E-mail, Status)
- ✅ Busca em tempo real com debounce (500ms)
- ✅ Paginação com controle de itens por página
- ✅ Loading states com skeletons
- ✅ Empty states personalizados
- ✅ Error states com retry

### ➕ Cadastro de Usuário

- ✅ Modal com formulário controlado
- ✅ Validação em tempo real:
  - Nome: mínimo 3 caracteres
  - E-mail: formato válido
  - Status: seleção obrigatória (Ativo/Inativo)
- ✅ Feedback visual de erros
- ✅ Loading state durante submissão
- ✅ Toast notifications de sucesso/erro
- ✅ Invalidação automática da cache

### ✏️ Edição de Usuário

- ✅ Reutilização do componente de formulário
- ✅ Pré-preenchimento automático dos campos
- ✅ Mesma validação do cadastro
- ✅ Feedback imediato de sucesso

### 🗑️ Exclusão de Usuário

- ✅ Dialog de confirmação
- ✅ Delay de 1s no botão para evitar cliques acidentais
- ✅ Toast notification de confirmação
- ✅ Atualização automática da lista

### 🌓 Dark Mode

- ✅ Toggle manual no header
- ✅ Detecção automática da preferência do sistema
- ✅ Persistência no localStorage
- ✅ Transições suaves entre temas
- ✅ Ícones intuitivos (Sol/Lua)

### ♿ Acessibilidade

- ✅ Navegação completa por teclado (Tab, Enter, Esc)
- ✅ Atributos ARIA em elementos interativos
- ✅ Focus trap em modais
- ✅ Contraste adequado (WCAG AA)
- ✅ Screen reader friendly

---

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado:

- **Node.js** versão 20.x ou superior ([Download](https://nodejs.org/))
- **npm** versão 9.x ou superior (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

Para verificar as versões instaladas:

```bash
node --version  # deve retornar v20.x.x ou superior
npm --version   # deve retornar 9.x.x ou superior
git --version
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/user-management-panel.git
cd user-management-panel
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure Husky (hooks de Git)

```bash
npm run prepare
```

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento (http://localhost:5173)

# Build
npm run build            # Gera build de produção otimizado
npm run preview          # Preview do build de produção

# Testes
npm run test             # Executa todos os testes
npm run test:watch       # Executa testes em modo watch
npm run test:coverage    # Gera relatório de cobertura de testes

# Qualidade de Código
npm run lint             # Executa ESLint
npm run lint:fix         # Executa ESLint e corrige problemas automaticamente
npm run format           # Formata código com Prettier
npm run format:check     # Verifica formatação sem modificar arquivos
```

---

## 📁 Estrutura de Pastas

```
src/
├── api/                    # Configuração de API e endpoints
│   ├── client.ts          # Configuração do Axios com interceptors
│   └── users.ts           # Endpoints de usuários
├── components/            # Componentes React
│   ├── layout/           # Componentes de layout
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── ui/               # Componentes reutilizáveis
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── index.ts
│   └── users/            # Componentes específicos de usuários
│       ├── DeleteConfirmDialog.tsx
│       ├── UserFilters.tsx
│       ├── UserFormDialog.tsx
│       ├── UserTable.tsx
│       └── index.ts
├── contexts/              # React Contexts
│   ├── ThemeContext.tsx  # Gerenciamento de tema (dark/light)
│   └── index.ts
├── hooks/                 # Custom hooks
│   ├── useDebounce.ts    # Hook de debounce
│   ├── useLocalStorage.ts # Persistência no localStorage
│   ├── useUsers.ts       # Hooks de usuários (CRUD com React Query)
│   └── index.ts
├── lib/                   # Utilitários e configurações
│   ├── constants.ts      # Constantes da aplicação
│   ├── logger.ts         # Logger customizado
│   ├── queryClient.ts    # Configuração React Query
│   ├── utils.ts          # Funções utilitárias
│   └── index.ts
├── pages/                # Páginas da aplicação
│   ├── Users.tsx         # Página de gerenciamento de usuários
│   └── Users.test.tsx    # Testes de integração
├── schemas/              # Schemas de validação Zod
│   ├── user.schema.ts    # Schema de validação de usuário
│   ├── user.schema.test.ts
│   └── index.ts
├── test/                 # Configuração de testes
│   ├── mocks/
│   │   ├── axios-adapter.ts  # Adapter customizado para Jest + MSW
│   │   ├── handlers.ts       # MSW request handlers
│   │   └── server.ts         # Configuração do MSW server
│   └── utils.tsx         # Utilitários de teste (render customizado)
├── types/                # Definições de tipos TypeScript
│   └── user.types.ts
├── App.tsx               # Componente raiz
├── main.tsx             # Entry point
└── index.css            # Estilos globais + customizações de toast
```

### 🎯 Organização por Responsabilidades

- **`/api`**: Camada de comunicação com backend
- **`/components`**: Camada de apresentação (UI)
- **`/contexts`**: Estado global compartilhado (tema)
- **`/hooks`**: Lógica reutilizável e side effects
- **`/lib`**: Utilitários e configurações globais
- **`/schemas`**: Validação e contratos de dados
- **`/test`**: Mocks e utilitários de teste
- **`/types`**: Contratos TypeScript

---

## 🧠 Decisões Técnicas

### Por que React Query ao invés de Redux?

**React Query** foi escolhido porque:

- Gerencia automaticamente cache, revalidação e loading states
- Reduz significativamente o boilerplate de código
- Otimizações de performance out-of-the-box (deduplicação de requests, background refetching)
- Melhor experiência de desenvolvimento com DevTools integrado

### Por que Zod + React Hook Form?

**Zod** oferece:

- Type-safety completo: os tipos TypeScript são inferidos automaticamente do schema
- Validações declarativas e compostas
- Mensagens de erro customizáveis

**React Hook Form** oferece:

- Performance superior (menos re-renders)
- API simples e intuitiva
- Validação assíncrona nativa
- Integração perfeita com Zod via `@hookform/resolvers`

### Por que Context API para tema?

Para estado simples e global como tema:

- **Context API** é nativo do React (zero dependências)
- Suficiente para estados simples que não mudam frequentemente
- Integração perfeita com hooks customizados
- Persistência com `useLocalStorage` hook customizado

### Separação de Responsabilidades

A arquitetura segue princípios de **Clean Architecture**:

- **API Layer**: Isolada e substituível
- **Business Logic**: Nos hooks customizados
- **Presentation**: Componentes puros e controlados
- **Validation**: Schemas centralizados

### Otimizações de Performance

1. **Memoização**: `useMemo` para computações pesadas (ordenação, filtragem)
2. **Debounce**: Busca com delay de 500ms para reduzir requisições
3. **Paginação**: Renderiza apenas itens visíveis
4. **React Query Cache**: Evita requisições duplicadas
5. **Code Splitting**: Preparado para lazy loading de rotas

---

## 🧪 Testes

### Cobertura Atual

```
✅ Test Suites: 5 passed, 5 total
✅ Tests: 37 passed, 37 total
✅ Snapshots: 0 total
```

A aplicação possui **testes unitários e de integração** cobrindo:

#### ✅ Testes Unitários (31 testes)

- **Schema Zod**: Validação de dados válidos/inválidos (`user.schema.test.ts`)
- **Funções utilitárias**: `formatStatus`, `sortUsers`, `filterUsers`, `paginateUsers` (`utils.test.ts`)
- **Hooks customizados**: `useDebounce`, `useLocalStorage` (com casos de edge)

#### ✅ Testes de Integração (6 testes)

- **Página Users**: Fluxo completo CRUD (`Users.test.tsx`)
  - Renderização e carregamento de dados
  - Criação de novo usuário com validação
  - Filtro de busca com debounce
  - Ordenação de colunas
  - Edição de usuário existente
  - Exclusão com modal de confirmação
- **Interações reais**: Simuladas com `@testing-library/user-event`
- **Mock de API**: MSW 2.0 com adapter customizado para Jest

### Executar Testes

```bash
# Executar todos os testes
npm run test

# Modo watch (recomendado para desenvolvimento)
npm run test:watch

# Gerar relatório de cobertura HTML
npm run test:coverage
```

### Estratégia de Testes

- **Testes de componentes**: Focam no comportamento do usuário (não detalhes de implementação)
- **Queries semânticas**: `getByRole`, `getByLabelText` (accessibility-first)
- **Mocks realistas**: MSW 2.0 intercepta requisições em nível de rede
- **Adapter customizado**: Implementação de fetch adapter para compatibilidade Jest + MSW + Axios
- **Isolamento**: Cada teste é independente com cleanup automático
- **Setup/Teardown**: MSW server configurado em `jest.setup.ts`

---

## 🔄 CI/CD

O projeto possui pipeline completo configurado em `.github/workflows/ci.yml`:

#### 🔍 Lint & Test

- ✅ Checkout do código
- ✅ Setup do Node.js 20 com cache npm
- ✅ Instalação de dependências
- ✅ Verificação de formatação (Prettier)
- ✅ Linting (ESLint) com verificação de tipos
- ✅ Execução de todos os testes (Jest)
- ✅ Geração de relatório de cobertura

#### 🏗️ Build

- ✅ Build da aplicação
- ✅ Upload de artifacts

#### 🚀 Deploy (opcional)

- ✅ Deploy automático em push para `main`
- ✅ Suporte para Vercel/Netlify

### Pre-commit Hooks (Husky)

Antes de cada commit, são executados automaticamente:

- **lint-staged**: Lint e format apenas dos arquivos modificados
- Garante que código mal formatado não entre no repositório

---

## 🔮 Melhorias Futuras

### Funcionalidades

- [ ] Autenticação e autorização (JWT)
- [ ] Filtros avançados (múltiplos campos, data ranges)
- [ ] Exportação de dados (CSV, Excel)
- [ ] Edição inline na tabela
- [ ] Bulk actions (excluir múltiplos usuários)
- [ ] Histórico de alterações (audit log)

### Técnicas

- [ ] Migrar para APIs não deprecadas do MUI v7
- [ ] Internacionalização (i18n) com react-i18next
- [ ] Server-Side Rendering (SSR) com Next.js ou Remix
- [ ] PWA (Progressive Web App) com service workers
- [ ] Storybook para documentação de componentes
- [ ] E2E tests com Playwright
- [ ] Monitoramento de erros (Sentry)
- [ ] Analytics (Vercel Analytics, Posthog)

### Performance

- [ ] Virtual scrolling para grandes listas (react-window)
- [ ] Service Worker para cache offline
- [ ] Lazy loading de rotas
- [ ] Image optimization

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ como desafio técnico demonstrando habilidades em:

- Arquitetura de software escalável
- Código limpo e manutenível
- Boas práticas de desenvolvimento
- Testes automatizados
- DevOps e CI/CD

---

<div align="center">

**[⬆ Voltar ao topo](#-painel-de-gestão-de-usuários)**

</div>
