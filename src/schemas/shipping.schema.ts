import { z } from "zod";

const shippingSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  address: z.string().nonempty("O endereço é obrigatório."),
  city: z.string().nonempty("A cidade é obrigatória."),
  postalCode: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "O CEP deve estar no formato 00000-000."),
  distance: z
    .number()
    .positive("A distância deve ser um valor positivo.")
    .min(1, "A distância mínima é de 1 km."),
  shippingCost: z
    .number()
    .positive("O custo de envio deve ser um valor positivo."),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const shippingCreateSchema = shippingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const shippingUpdateSchema = shippingCreateSchema.partial();

export { shippingSchema, shippingCreateSchema, shippingUpdateSchema };
