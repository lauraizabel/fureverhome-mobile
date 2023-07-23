import { UserType } from 'app/enum/UserType';
import z from 'zod';

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

export const firstStepFieldsValidation = z
  .object({
    firstName: z
      .string({
        errorMap: customErrorMap,
      })
      .min(2)
      .max(50),
    lastName: z
      .string({
        errorMap: customErrorMap,
      })
      .min(2)
      .max(50),
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

export const secondStepFieldsValidation = z.object({
  dateOfBirth: z.date(),
  phone: z.string(),
  job: z.string().optional(),
  cpf: z.string().optional(),
  type: z.enum([UserType.FISICAL, UserType.ONG]),
});

export const thirdStepFieldsValidation = z.object({
  street: z.string(),
  number: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
});
