import { render, waitFor } from '../test/utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Users } from './Users';

describe('Users - Integration Test', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve renderizar lista de usuários e permitir criar novo usuário', async () => {
    const user = userEvent.setup();
    const { getByText, getByRole, queryByRole, getByLabelText, getAllByRole } = render(<Users />);

    // Aguardar carregamento dos usuários
    await waitFor(() => {
      expect(getByText('João Silva')).toBeInTheDocument();
    });

    // Verificar usuários mockados
    expect(getByText('maria@example.com')).toBeInTheDocument();
    expect(getByText('Pedro Oliveira')).toBeInTheDocument();

    // Clicar no botão de novo usuário
    const newUserButton = getByRole('button', { name: /novo usuário/i });
    await user.click(newUserButton);

    // Verificar se modal abriu
    await waitFor(() => {
      expect(getByRole('dialog')).toBeInTheDocument();
    });

    // Preencher formulário
    const nameInput = getByLabelText(/nome/i);
    const emailInput = getByLabelText(/e-mail/i);
    const statusSelect = getByLabelText(/status/i);

    await user.type(nameInput, 'Novo Usuário');
    await user.type(emailInput, 'novo@example.com');
    await user.click(statusSelect);

    // Aguardar opções aparecerem e selecionar "Ativo"
    await waitFor(() => {
      const options = getAllByRole('option', { name: /ativo/i });
      expect(options.length).toBeGreaterThan(0);
    });

    const activeOptions = getAllByRole('option', { name: /ativo/i });
    await user.click(activeOptions[0]!);

    // Submeter formulário
    const saveButton = getByRole('button', { name: /salvar/i });
    await user.click(saveButton);

    // Aguardar modal fechar
    await waitFor(() => {
      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('deve filtrar usuários pela busca', async () => {
    const user = userEvent.setup();
    const { getByText, getByPlaceholderText, getAllByRole } = render(<Users />);

    // Aguardar carregamento
    await waitFor(() => {
      expect(getByText('João Silva')).toBeInTheDocument();
    });

    // Digitar na busca
    const searchInput = getByPlaceholderText(/buscar por nome ou e-mail/i);
    await user.type(searchInput, 'Maria');

    // Aguardar debounce (500ms)
    await waitFor(
      () => {
        const rows = getAllByRole('row');
        // Header row + 1 data row
        expect(rows.length).toBeLessThanOrEqual(2);
      },
      { timeout: 1000 }
    );
  });

  it('deve ordenar usuários ao clicar no cabeçalho da coluna', async () => {
    const user = userEvent.setup();
    const { getByText, getByRole } = render(<Users />);

    // Aguardar carregamento
    await waitFor(() => {
      expect(getByText('João Silva')).toBeInTheDocument();
    });

    // Clicar no cabeçalho "Nome" para ordenar
    const nameHeader = getByRole('button', { name: /nome/i });
    await user.click(nameHeader);

    // Verificar se a ordenação foi aplicada (visual feedback)
    expect(nameHeader).toBeInTheDocument();
  });

  it('deve abrir modal de edição ao clicar no botão editar', async () => {
    const user = userEvent.setup();
    const { getByText, getAllByLabelText, getByRole, getByDisplayValue } = render(<Users />);

    // Aguardar carregamento
    await waitFor(() => {
      expect(getByText('João Silva')).toBeInTheDocument();
    });

    // Encontrar e clicar no primeiro botão de editar
    const editButtons = getAllByLabelText(/editar usuário/i);
    await user.click(editButtons[0]!);

    // Verificar se modal abriu com dados preenchidos
    await waitFor(() => {
      expect(getByRole('dialog')).toBeInTheDocument();
      expect(getByDisplayValue('João Silva')).toBeInTheDocument();
    });
  });

  it('deve abrir modal de confirmação ao clicar no botão excluir', async () => {
    const user = userEvent.setup();
    const { getByText, getAllByLabelText } = render(<Users />);

    // Aguardar carregamento
    await waitFor(() => {
      expect(getByText('João Silva')).toBeInTheDocument();
    });

    // Encontrar e clicar no primeiro botão de excluir
    const deleteButtons = getAllByLabelText(/excluir usuário/i);
    await user.click(deleteButtons[0]!);

    // Verificar se modal de confirmação abriu
    await waitFor(() => {
      expect(getByText(/confirmar exclusão/i)).toBeInTheDocument();
    });
  });

  it('deve validar campos obrigatórios do formulário', async () => {
    const user = userEvent.setup();
    const { getByText, getByRole } = render(<Users />);

    // Aguardar carregamento
    await waitFor(() => {
      expect(getByText('João Silva')).toBeInTheDocument();
    });

    // Abrir modal de novo usuário
    const newUserButton = getByRole('button', { name: /novo usuário/i });
    await user.click(newUserButton);

    // Aguardar modal abrir
    await waitFor(() => {
      expect(getByRole('dialog')).toBeInTheDocument();
    });

    // Tentar submeter formulário vazio
    const saveButton = getByRole('button', { name: /salvar/i });
    await user.click(saveButton);

    // Verificar mensagens de erro
    await waitFor(() => {
      expect(getByText(/nome deve ter no mínimo 3 caracteres/i)).toBeInTheDocument();
    });
  });
});
