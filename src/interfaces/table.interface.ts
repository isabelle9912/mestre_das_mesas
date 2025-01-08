import { z } from "zod";
import {
  tableCreateSchema,
  tableSchema,
} from "../schemas/table.schema";

type iTable = z.infer<typeof tableSchema>;
type iTableCreate = z.infer<typeof tableCreateSchema>;
type iTableUpdate = Partial<Pick<iTableCreate, keyof iTableCreate>>;

export { iTable, iTableCreate, iTableUpdate };
