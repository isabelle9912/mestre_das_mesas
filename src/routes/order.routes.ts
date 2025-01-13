import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import {
  createOrderController,
  deleteOrderController,
  getAllOrderController,
  getOrderIdController,
  updateOrderController,
} from "../controllers/order.controllers";
import { orderCreateSchema, orderUpdateSchema } from "../schemas/order.schema";
import Order from "../models/Order";

const orderRoutes = Router();

/**
 * Rota para obter um Order pelo seu ID.
 *
 * @name GET /order
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller getAllOrderIdController - Retorna o Order.
 */
orderRoutes.get("/:id", ensureTokenIsValidMiddleware, getOrderIdController);

/**
 * Rota para obter todos os orders de um apoiador pelo seu ID.
 *
 * @name GET /order
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller getAllcolorIdController - Retorna os orders do apoiador.
 */
orderRoutes.get(
  "/",
  ensureTokenIsValidMiddleware,
  getAllOrderController
);

/**
 * Rota para criar um novo Order.
 *
 * @name POST /order
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller createOrderController - Cria um novo Order.
 */
orderRoutes.post(
  "/",
  ensureDataIsValidMiddleware(orderCreateSchema),
  ensureTokenIsValidMiddleware,
  createOrderController
);

/**
 * Rota para atualizar um Order pelo seu ID.
 *
 * @name PATCH /order/:id
 * @middleware ensureExistsMiddleware - Verifica se o Order existe.
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller updateOrderController - Atualiza o Order solicitado.
 */
orderRoutes.patch(
  "/:id",
  ensureExistsMiddleware(Order, "Order"),
  ensureDataIsValidMiddleware(orderUpdateSchema),
  ensureTokenIsValidMiddleware,
  updateOrderController
);

/**
 * Rota para deletar um Order pelo seu ID.
 *
 * @name DELETE /order/:id
 * @middleware ensureExistsMiddleware - Verifica se o Order existe.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller deleteOrderController - Deleta o Order solicitado.
 */
orderRoutes.delete(
  "/:id",
  ensureExistsMiddleware(Order, "Order"),
  ensureTokenIsValidMiddleware,
  deleteOrderController
);

export default orderRoutes;
