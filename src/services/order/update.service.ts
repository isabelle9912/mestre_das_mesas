import { AppError } from "../../errors";

import { iOrder, iOrderUpdate } from "../../interfaces/order.interface";
import Order from "../../models/Order";
import { orderSchema } from "../../schemas/order.schema";

/**
 * Serviço para atualizar um Order.
 *
 * @async
 * @function updateOrderService
 * @param {iOrderUpdate} payload - Os dados necessários para atualizar o Order.
 * @param {number} id - Identificação do Order atualizar seus dados.
 * @throws {AppError} Caso a atualização do Order falhe.
 * @returns {Promise<iOrder>} O Order atualizado e validado.
 *
 * @example
 * // Exemplo de payload
 * const payload = {
    tableId?: number;
    idUser?: number;
    status?: "pending" | "inProduction" | "shipped" | "completed";
 * };
 *
 * const updatedOrder = await updateOrderService(id, payload);
 *
 * // Exemplo de resposta
 * {
    id: number;
    tableId: number;
    idUser: number;
    status: "pending" | "inProduction" | "shipped" | "completed";
    createdAt: Date;
    updatedAt: Date;
 * }
 */
const updateOrderService = async (
  id: number,
  payload: iOrderUpdate
): Promise<iOrder> => {
  const updatedOrder = await Order.update(payload, { where: { id } });

  if (!updatedOrder) {
    throw new AppError("Não foi possível atualizar o Order", 409);
  }

  const retrivedOrder = await Order.findOne({ where: { id } });

  return orderSchema.parse(retrivedOrder);
};

export default updateOrderService;
