import '@testing-library/jest-dom';
import { server } from './src/test/mocks/server';
import { apiClient } from './src/api/client';
import { createMockAdapter } from './src/test/mocks/axios-adapter';

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Configura o axios para usar o fetch adapter nos testes
apiClient.defaults.adapter = createMockAdapter();

// Estabelece o servidor de API mock antes de todos os testes
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Reseta qualquer request handler que possamos adicionar durante os testes
afterEach(() => server.resetHandlers());

// Limpa após todos os testes terminarem
afterAll(() => server.close());
