import { z } from "zod";

const orderSchema = z.object({
  id: z.number(),
  tableId: z.number(),
  idUser: z.number(),
  status: z.enum(["pending", "inProduction", "shipped", "completed"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const orderCreateSchema = orderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const orderUpdateSchema = orderCreateSchema.partial();

export { orderSchema, orderCreateSchema, orderUpdateSchema };
