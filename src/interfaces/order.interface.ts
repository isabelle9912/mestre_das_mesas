import { z } from "zod";
import { orderCreateSchema, orderSchema } from "../schemas/order.schema";

type iOrder = z.infer<typeof orderSchema>;
type iOrderCreate = z.infer<typeof orderCreateSchema>;
type iOrderUpdate = Partial<Pick<iOrderCreate, keyof iOrderCreate>>;

export { iOrder, iOrderCreate, iOrderUpdate };
