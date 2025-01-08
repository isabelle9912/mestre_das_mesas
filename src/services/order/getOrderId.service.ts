import { AppError } from "../../errors";
import { iOrder } from "../../interfaces/order.interface";
import Order from "../../models/Order";
import { orderSchema } from "../../schemas/order.schema";

/**
  * Serviço para buscar todos Orders.
 \*
  * @async
  * @function getOrderId
  * @param {[number]} id - Número que identifica o Order.
  * @throws {AppError} Caso não seja encontrada o Order.
  * @returns {Promise<iOrder>}  A Order encontrado e validado.
 \*
  * @example
  * // Exemplo de chamada
  * const retrivedOrder = await getOrderId(2);
 \*
  * // Exemplo de retorno
 * {
    id: number;
    tableId: number;
    idUser: number;
    status: "pending" | "inProduction" | "shipped" | "completed";
    createdAt: Date;
    updatedAt: Date;
 * }
 */

const getOrderId = async (id: number): Promise<iOrder> => {
  const retrivedOrder = await Order.findOne({ where: { id } });

  if (!retrivedOrder) {
    throw new AppError("Não foi possível encontrar o Order!", 404);
  }
  return orderSchema.parse(retrivedOrder);
};

export default getOrderId;
