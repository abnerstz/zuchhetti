import { apiClient } from './client';
import { User } from '@/types/user.types';
import { UserFormData } from '@/schemas/user.schema';

const transformUser = (user: Partial<User>): User => ({
  ...user,
  id: user.id ?? 0,
  name: user.name ?? '',
  email: user.email ?? '',
  status: user.status ?? 'active',
});

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<Omit<User, 'status'>[]>('/users');
    return response.data.map((user) => transformUser(user));
  },

  getById: async (id: number): Promise<User> => {
    const response = await apiClient.get<Omit<User, 'status'>>(`/users/${id}`);
    return transformUser(response.data);
  },

  create: async (data: UserFormData): Promise<User> => {
    const response = await apiClient.post<Omit<User, 'status'>>('/users', data);
    return transformUser({ ...response.data, status: data.status });
  },

  update: async (id: number, data: Partial<UserFormData>): Promise<User> => {
    const response = await apiClient.patch<Omit<User, 'status'>>(`/users/${id}`, data);
    return transformUser({ ...response.data, status: data.status });
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
