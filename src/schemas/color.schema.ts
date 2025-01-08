import { z } from "zod";

const colorSchema = z.object({
  id: z.number(),
  name: z.string(),
  hexCode: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Código hexadecimal inválido."),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const colorCreateSchema = colorSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const colorUpdateSchema = colorCreateSchema.partial();

export { colorSchema, colorCreateSchema, colorUpdateSchema };
