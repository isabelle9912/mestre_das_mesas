import { AppError } from "../../errors";
import { iOrder } from "../../interfaces/order.interface";
import Order from "../../models/Order";
import { orderSchema } from "../../schemas/order.schema";

/**
  * Serviço para buscar todos Orders.
 \*
  * @async
  * @function getAllOrder
  * @param {[number]} idUser - Número que identifica o usuario.
  * @throws {AppError} Caso não seja encontrada o Order.
  * @returns {Promise<iOrder>}  A Order encontrado e validado.
 \*
  * @example
  * // Exemplo de chamada
  * const retrivedOrders = await getAllOrder(2);
 \*
  * // Exemplo de retorno
 * {
    id: number;
    tableId: number;
    idUser: number;
    status: "pending" | "inProduction" | "shipped" | "completed";
    createdAt: Date;
    updatedAt: Date;
 * }[]
 */

const getAllOrder = async (idUser: number): Promise<iOrder[]> => {
  const retrivedOrders = await Order.findAll({ where: { idUser } });

  if (!retrivedOrders) {
    throw new AppError("Não foi possível encontrar nenhum Order!", 404);
  }
  return orderSchema.array().parse(retrivedOrders);
};

export default getAllOrder;
