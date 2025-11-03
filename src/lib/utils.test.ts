import { describe, it, expect } from '@jest/globals';
import {
  formatStatus,
  getStatusColor,
  sortUsers,
  filterUsersBySearch,
  paginateUsers,
} from './utils';
import { User } from '@/types/user.types';

const mockUsers: User[] = [
  { id: 1, name: 'Ana Silva', email: 'ana@example.com', status: 'active' },
  { id: 2, name: 'Bruno Costa', email: 'bruno@example.com', status: 'inactive' },
  { id: 3, name: 'Carlos Lima', email: 'carlos@example.com', status: 'active' },
];

describe('formatStatus', () => {
  it('deve formatar status ativo corretamente', () => {
    expect(formatStatus('active')).toBe('Ativo');
  });

  it('deve formatar status inativo corretamente', () => {
    expect(formatStatus('inactive')).toBe('Inativo');
  });
});

describe('getStatusColor', () => {
  it('deve retornar cor success para status ativo', () => {
    expect(getStatusColor('active')).toBe('success');
  });

  it('deve retornar cor error para status inativo', () => {
    expect(getStatusColor('inactive')).toBe('error');
  });
});

describe('sortUsers', () => {
  it('deve ordenar usuários por nome em ordem ascendente', () => {
    const sorted = sortUsers(mockUsers, 'name', 'asc');
    expect(sorted[0]?.name).toBe('Ana Silva');
    expect(sorted[1]?.name).toBe('Bruno Costa');
    expect(sorted[2]?.name).toBe('Carlos Lima');
  });

  it('deve ordenar usuários por nome em ordem descendente', () => {
    const sorted = sortUsers(mockUsers, 'name', 'desc');
    expect(sorted[0]?.name).toBe('Carlos Lima');
    expect(sorted[1]?.name).toBe('Bruno Costa');
    expect(sorted[2]?.name).toBe('Ana Silva');
  });

  it('deve ordenar usuários por id em ordem ascendente', () => {
    const sorted = sortUsers(mockUsers, 'id', 'asc');
    expect(sorted[0]?.id).toBe(1);
    expect(sorted[1]?.id).toBe(2);
    expect(sorted[2]?.id).toBe(3);
  });

  it('deve ordenar usuários por id em ordem descendente', () => {
    const sorted = sortUsers(mockUsers, 'id', 'desc');
    expect(sorted[0]?.id).toBe(3);
    expect(sorted[1]?.id).toBe(2);
    expect(sorted[2]?.id).toBe(1);
  });
});

describe('filterUsersBySearch', () => {
  it('deve filtrar usuários por nome', () => {
    const filtered = filterUsersBySearch(mockUsers, 'ana');
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.name).toBe('Ana Silva');
  });

  it('deve filtrar usuários por email', () => {
    const filtered = filterUsersBySearch(mockUsers, 'bruno@');
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.email).toBe('bruno@example.com');
  });

  it('deve ser case insensitive', () => {
    const filtered = filterUsersBySearch(mockUsers, 'CARLOS');
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.name).toBe('Carlos Lima');
  });

  it('deve retornar todos os usuários quando busca está vazia', () => {
    const filtered = filterUsersBySearch(mockUsers, '');
    expect(filtered).toHaveLength(3);
  });

  it('deve retornar array vazio quando não há matches', () => {
    const filtered = filterUsersBySearch(mockUsers, 'xyz123');
    expect(filtered).toHaveLength(0);
  });
});

describe('paginateUsers', () => {
  it('deve retornar primeira página corretamente', () => {
    const paginated = paginateUsers(mockUsers, 1, 2);
    expect(paginated).toHaveLength(2);
    expect(paginated[0]?.id).toBe(1);
    expect(paginated[1]?.id).toBe(2);
  });

  it('deve retornar segunda página corretamente', () => {
    const paginated = paginateUsers(mockUsers, 2, 2);
    expect(paginated).toHaveLength(1);
    expect(paginated[0]?.id).toBe(3);
  });

  it('deve retornar todos os usuários quando pageSize é maior que total', () => {
    const paginated = paginateUsers(mockUsers, 1, 10);
    expect(paginated).toHaveLength(3);
  });

  it('deve retornar array vazio quando página não existe', () => {
    const paginated = paginateUsers(mockUsers, 5, 2);
    expect(paginated).toHaveLength(0);
  });
});
