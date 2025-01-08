import { z } from "zod";
import { colorCreateSchema, colorSchema } from "../schemas/color.schema";

type iColor = z.infer<typeof colorSchema>;
type iColorCreate = z.infer<typeof colorCreateSchema>;
type iColorUpdate = Partial<Pick<iColorCreate, keyof iColorCreate>>;

export { iColor, iColorCreate, iColorUpdate };
