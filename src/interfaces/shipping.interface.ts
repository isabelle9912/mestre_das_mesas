import { z } from "zod";
import {
  shippingCreateSchema,
  shippingSchema,
} from "../schemas/shipping.schema";

type iShipping = z.infer<typeof shippingSchema>;
type iShippingCreate = z.infer<typeof shippingCreateSchema>;
type iShippingUpdate = Partial<Pick<iShippingCreate, keyof iShippingCreate>>;

export { iShipping, iShippingCreate, iShippingUpdate };
