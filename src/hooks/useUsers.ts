import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/api/users';
import { userKeys } from '@/lib/constants';
import { UserFormData } from '@/schemas/user.schema';
import { toast } from 'sonner';

export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: usersApi.getAll,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: id > 0,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.all });

      toast.success('Usuário criado!', {
        description: 'O novo usuário foi adicionado ao sistema com sucesso.',
      });
    },
    onError: () => {
      toast.error('Falha ao criar usuário', {
        description: 'Ocorreu um erro ao tentar criar o usuário. Tente novamente.',
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<UserFormData> }) =>
      usersApi.update(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: userKeys.lists() });

      const previousUsers = queryClient.getQueryData(userKeys.lists());

      queryClient.setQueryData(userKeys.lists(), (old: unknown) => {
        if (!Array.isArray(old)) return old;
        return old.map((user) => (user.id === id ? { ...user, ...data } : user));
      });

      return { previousUsers };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(userKeys.lists(), context.previousUsers);
      }

      toast.error('Falha ao atualizar usuário', {
        description: 'Ocorreu um erro ao tentar atualizar o usuário. Tente novamente.',
      });
    },

    // onSettled: () => {
    //   void queryClient.invalidateQueries({ queryKey: userKeys.all });
    // },

    onSuccess: () => {
      toast.success('Usuário atualizado!', {
        description: 'As informações do usuário foram atualizadas com sucesso.',
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.delete,

    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: userKeys.lists() });

      const previousUsers = queryClient.getQueryData(userKeys.lists());

      queryClient.setQueryData(userKeys.lists(), (old: unknown) => {
        if (!Array.isArray(old)) return old;
        return old.filter((user) => user.id !== deletedId);
      });

      return { previousUsers };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(userKeys.lists(), context.previousUsers);
      }

      toast.error('Falha ao excluir usuário', {
        description: 'Ocorreu um erro ao tentar excluir o usuário. Tente novamente.',
      });
    },

    // onSettled: () => {
    //   void queryClient.invalidateQueries({ queryKey: userKeys.all });
    // },

    onSuccess: () => {
      toast.success('Usuário excluído!', {
        description: 'O usuário foi removido do sistema com sucesso.',
      });
    },
  });
}
