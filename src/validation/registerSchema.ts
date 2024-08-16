import { z } from 'zod';
export const registerSchema = z
  .object({
    correo: z.string().email({ message: 'Porfavor ingrese un correo valido' }),
    user: z
      .string()
      .min(5, { message: 'Debe contener mas de 5 caracteres' })
      .max(25, {
        message:
          'El nombre de usuario es demasiado largo, debe contener menos de 25 caracteres',
      }),
    password: z
      .string()
      .min(5, { message: 'Debe contener mas de 5 caracteres' }),
    passwordConfir: z
      .string()
      .min(5, { message: 'Debe contener mas de 5 caracteres' }),
  })
  .refine((data) => data.password === data.passwordConfir, {
    message: 'Las contraseñas no son identicas',
    path: ['passwordConfir'],
  });
