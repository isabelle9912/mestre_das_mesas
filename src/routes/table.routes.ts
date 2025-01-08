import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import {
  createTableController,
  deleteTableController,
  getTableIdController,
  updateTableController,
} from "../controllers/table.controllers";
import {
  tableCreateSchema,
  tableUpdateSchema,
} from "../schemas/table.schema";
import Table from "../models/Table";

const TableRoutes = Router();

/**
 * Rota para obter um Table pelo seu ID.
 *
 * @name GET /table
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller getAllTableIdController - Retorna o Table.
 */
TableRoutes.get(
  "/",
  ensureTokenIsValidMiddleware,
  getTableIdController
);


/**
 * Rota para criar um novo Table.
 *
 * @name POST /table
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller createTableController - Cria um novo Table.
 */
TableRoutes.post(
  "/",
  ensureDataIsValidMiddleware(tableCreateSchema),
  ensureTokenIsValidMiddleware,
  createTableController
);

/**
 * Rota para atualizar um Table pelo seu ID.
 *
 * @name PATCH /table/:id
 * @middleware ensureExistsMiddleware - Verifica se o Table existe.
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller updateTableController - Atualiza o Table solicitado.
 */
TableRoutes.patch(
  "/:id",
  ensureExistsMiddleware(Table, "Table"),
  ensureDataIsValidMiddleware(tableUpdateSchema),
  ensureTokenIsValidMiddleware,
  updateTableController
);

/**
 * Rota para deletar um Table pelo seu ID.
 *
 * @name DELETE /table/:id
 * @middleware ensureExistsMiddleware - Verifica se o Table existe.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller deleteTableController - Deleta o Table solicitado.
 */
TableRoutes.delete(
  "/:id",
  ensureExistsMiddleware(Table, "Table"),
  ensureTokenIsValidMiddleware,
  deleteTableController
);

export default TableRoutes;
