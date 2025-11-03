import { z } from 'zod';

export const userFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string().trim().email('E-mail inválido').toLowerCase(),
  status: z.enum(['active', 'inactive'], {
    required_error: 'Status é obrigatório',
  }),
});

export type UserFormData = z.infer<typeof userFormSchema>;
