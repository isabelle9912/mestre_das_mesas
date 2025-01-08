import { z } from "zod";

const tableSchema = z.object({
  id: z.number(),
  dimensions: z.object({
    length: z.number().min(30, "Comprimento mínimo é 30cm."),
    width: z.number().min(30, "Largura mínima é 30cm."),
    height: z.number().min(30, "Altura mínima é 30cm."),
  }),
  colorId: z.number(),
  price: z.number().positive("O preço deve ser positivo."),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const tableCreateSchema = tableSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const tableUpdateSchema = tableCreateSchema.partial();

export { tableSchema, tableCreateSchema, tableUpdateSchema };
