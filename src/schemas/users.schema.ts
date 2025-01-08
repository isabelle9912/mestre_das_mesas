import { z } from "zod";

const usersSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  role: z.enum(["admin", "user"]),
  phone: z
    .string()
    .regex(/^\+\d{1,3}\d{9,15}$/, "Número de telefone inválido."),
  address: z.string().min(10, "Endereço muito curto."),
  isTermAccepted: z.boolean().default(false),
  resetPasswordToken: z.string().nullable(),
  resetPasswordExpires: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

const usersWithoutPassSchema = usersSchema.omit({
  password: true,
  resetPasswordToken: true,
  resetPasswordExpires: true,
});

const usersCreateSchema = usersSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  resetPasswordToken: true,
  resetPasswordExpires: true,
});

const usersUpdateSchema = usersCreateSchema.partial();

export {
  usersSchema,
  usersWithoutPassSchema,
  usersCreateSchema,
  usersUpdateSchema,
};
