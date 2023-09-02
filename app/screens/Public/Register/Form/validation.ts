import { UserType } from 'app/enum/UserType';
import z, { ZodError } from 'zod';

const customErrorMap: z.ZodErrorMap = error => {
  const { code } = error;

  const messages = {
    [z.ZodIssueCode.too_small]: `O campo deve ter no mínimo ${
      (error as any)?.minimum
    } caracteres`,
  };

  const message = messages[code] || 'Verifique o campo';

  return { message };
};

const customErrorMapConst = {
  invalidFirstName: 'Primeiro nome inválido',
  invalidLastName: 'Sobrenome inválido',
  invalidOngName: 'Nome da ONG inválido',
};

export const firstStepFieldsValidation = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    ongName: z.string().optional(),
    type: z.enum([UserType.FISICAL, UserType.ONG]),
    description: z.string().optional(),
  })
  .refine(data => {
    if (data.type === UserType.FISICAL) {
      const filled =
        data.firstName !== undefined && data.lastName !== undefined;
      if (!filled) {
        throw new ZodError([
          {
            path: ['firstName'],
            message: customErrorMapConst.invalidFirstName,
            code: 'custom',
          },
          {
            path: ['lastName'],
            message: customErrorMapConst.invalidLastName,
            code: 'custom',
          },
        ]);
      }
      return filled;
    }
    if (data.type === UserType.ONG) {
      if (!data.ongName) {
        throw new ZodError([
          {
            path: ['ongName'],
            message: customErrorMapConst.invalidOngName,
            code: 'custom',
          },
        ]);
      }
      return true;
    }
    return true;
  });

export const secondStepFieldsValidation = z
  .object({
    dateOfBirth: z.date(),
    phone: z.string(),
    job: z.string().optional(),
    cpf: z.string().optional(),
    password: z
      .string({
        errorMap: customErrorMap,
      })
      .min(8),
    confirmPassword: z.string({
      errorMap: customErrorMap,
    }),
    email: z
      .string({
        errorMap: customErrorMap,
      })
      .email(),
  })
  .refine(data => data.confirmPassword === data.password, {
    message: 'As senhas devem ser iguais.',
    path: ['confirmPassword'],
  });

export const thirdStepFieldsValidation = z.object({
  street: z.string(),
  number: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
});
