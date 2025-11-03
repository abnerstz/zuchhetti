import { describe, it, expect } from '@jest/globals';
import { userFormSchema } from './user.schema';

describe('userFormSchema', () => {
  it('deve validar um usuário válido', () => {
    const validUser = {
      name: 'João Silva',
      email: 'joao@example.com',
      status: 'active' as const,
    };

    const result = userFormSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it('deve rejeitar nome com menos de 3 caracteres', () => {
    const invalidUser = {
      name: 'Jo',
      email: 'joao@example.com',
      status: 'active' as const,
    };

    const result = userFormSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain('mínimo 3 caracteres');
    }
  });

  it('deve rejeitar e-mail inválido', () => {
    const invalidUser = {
      name: 'João Silva',
      email: 'email-invalido',
      status: 'active' as const,
    };

    const result = userFormSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain('E-mail inválido');
    }
  });

  it('deve rejeitar status inválido', () => {
    const invalidUser = {
      name: 'João Silva',
      email: 'joao@example.com',
      status: 'invalid' as const,
    };

    const result = userFormSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it('deve trimmar nome e email', () => {
    const userWithSpaces = {
      name: '  João Silva  ',
      email: '  joao@example.com  ',
      status: 'active' as const,
    };

    const result = userFormSchema.safeParse(userWithSpaces);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('João Silva');
      expect(result.data.email).toBe('joao@example.com');
    }
  });

  it('deve converter email para lowercase', () => {
    const userWithUppercaseEmail = {
      name: 'João Silva',
      email: 'JOAO@EXAMPLE.COM',
      status: 'active' as const,
    };

    const result = userFormSchema.safeParse(userWithUppercaseEmail);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('joao@example.com');
    }
  });
});
