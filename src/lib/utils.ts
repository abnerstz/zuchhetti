import { User } from '@/types/user.types';

export function formatStatus(status: 'active' | 'inactive'): string {
  return status === 'active' ? 'Ativo' : 'Inativo';
}

export function getStatusColor(status: 'active' | 'inactive'): 'success' | 'error' {
  return status === 'active' ? 'success' : 'error';
}

export function sortUsers(users: User[], field: keyof User, order: 'asc' | 'desc'): User[] {
  return [...users].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue === undefined || bValue === undefined) return 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
}

export function filterUsersBySearch(users: User[], search: string): User[] {
  if (!search.trim()) return users;

  const lowerSearch = search.toLowerCase().trim();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch)
  );
}

export function paginateUsers(users: User[], page: number, pageSize: number): User[] {
  const startIndex = (page - 1) * pageSize;
  return users.slice(startIndex, startIndex + pageSize);
}
