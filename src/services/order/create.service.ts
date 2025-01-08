import { AppError } from "../../errors";
import { iOrder, iOrderCreate } from "../../interfaces/order.interface";
import Order from "../../models/Order";
import { orderSchema } from "../../schemas/order.schema";
/**
 * Serviço para criar uma nova Order.
 *
 * @async
 * @function createOrderService
 * @param {iOrderCreate} payload - Os dados necessários para criar o Order.
 * @throws {AppError} Caso a criação do Order falhe.
 * @returns {Promise<iOrder>} O Order criado e validado.
 *
 * @example
 * // Exemplo de payload
 * const payload = {
    tableId: number;
    idUser: number;
    status: "pending" | "inProduction" | "shipped" | "completed";
 * };
 *
 * const novoOrder = await createOrderService(payload);
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
const createOrderService = async (payload: iOrderCreate): Promise<iOrder> => {
  // Criação do Order no banco de dados
  const createdOrder = await Order.create(payload);

  // Lançar erro caso a criação falhe
  if (!createdOrder) {
    throw new AppError("Não foi possível criar o Order", 409);
  }

  // Retornar o Order validado com o schema
  return orderSchema.parse(createdOrder);
};