import { Request, Response } from "express";
import {
  iOrder,
  iOrderCreate,
  iOrderUpdate,
} from "../interfaces/order.interface";
import updateOrderService from "../services/order/update.service";
import deleteOrderIdService from "../services/order/deleteOrder.service";
import getOrderId from "../services/order/getOrderId.service";
import createOrderService from "../services/order/create.service";
import getAllOrder from "../services/order/getAllOrder.service";
/**
 * Obtém uma Order pelo seu id.
 * 
 * @async
 * @function getOrderIdController
 * @param {Request} req - Objeto de requisição do Express contendo o id.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Orders encontrados.
 * @throws {404} - Caso os Orders não sejam encontrados.
 * 
 * @example
 * // GET /order
 * // Response:
 * {
    id: number;
    tableId: number;
    idUser: number;
    status: "pending" | "inProduction" | "shipped" | "completed";
    createdAt: Date;
    updatedAt: Date;
}
 */

const getOrderIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id: number = Number(req.params.id);
  const order: iOrder = await getOrderId(id);

  return res.status(200).json(order);
};

/**
 * Obtém todos Orders.
 * 
 * @async
 * @function getAllOrderController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Orders encontrados.
 * @throws {404} - Caso os Orders não sejam encontrados.
 * 
 * @example
 * // GET /order
 * // Response:
 * {
    id: number;
    tableId: number;
    idUser: number;
    status: "pending" | "inProduction" | "shipped" | "completed";
    createdAt: Date;
    updatedAt: Date;
}[]
 */

const getAllOrderController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const idUser = Number(req.params.id);
  const allOrders = await getAllOrder(idUser);

  return res.status(200).json(allOrders);
};

/**
 * Cria um novo Order.
 *
 * @async
 * @function createOrderController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 201 - Order criado com sucesso.
 * @throws {409} - Caso o Order não seja criado.
 *
 *
 * @example
 * // POST /order
 * // Body:
 * {
    tableId: number;
    idUser: number;
    status: "pending" | "inProduction" | "shipped" | "completed";
 * }
 * // Response:
 * {
    id: number;
    tableId: number;
    idUser: number;
    status: "pending" | "inProduction" | "shipped" | "completed";
    createdAt: Date;
    updatedAt: Date;
 * }
 */
const createOrderController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const payload: iOrderCreate = req.body;

  const createdOrder: iOrder = await createOrderService(payload);

  return res.status(201).json(createdOrder);
};

/**
 * Atualiza um Order pelo seu ID.
 *
 * @async
 * @function updateOrderController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Order atualizado com sucesso.
 * @throws {409} - Caso o Order não seja atualizado.
 *
 * @example
 * // PATCH /order/10
 * // Body:
 * {
    tableId?: number;
    idUser?: number;
    status?: "pending" | "inProduction" | "shipped" | "completed";
 * }
 * // Response:
 * {
    id: number;
    tableId: number;
    idUser: number;
    status: "pending" | "inProduction" | "shipped" | "completed";
    createdAt: Date;
    updatedAt: Date;
 * }
 */

const updateOrderController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const payload: iOrderUpdate = req.body,
    id = Number(req.params.id);

  const updatedOrder = await updateOrderService(id, payload);

  return res.status(200).json(updatedOrder);
};

/**
 * Deleta um Order pelo seu ID.
 *
 * @async
 * @function deleteOrderController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 204 - Order deletado com sucesso.
 *
 * @example
 * // DELETE /order/10
 */

const deleteOrderController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = Number(req.params.id);

  await deleteOrderIdService(id);

  return res.status(204).send();
};

export {
  getOrderIdController,
  getAllOrderController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
};
