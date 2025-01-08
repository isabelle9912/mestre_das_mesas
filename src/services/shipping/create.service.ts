import { AppError } from "../../errors";
import {
  iShipping,
  iShippingCreate,
} from "../../interfaces/shipping.interface";
import Shipping from "../../models/Shipping";
import { shippingSchema } from "../../schemas/shipping.schema";
/**
 * Serviço para criar um novo Shipping.
 *
 * @async
 * @function createShippingService
 * @param {iShippingCreate} payload - Os dados necessários para criar o Shipping.
 * @throws {AppError} Caso a criação do Shipping falhe.
 * @returns {Promise<iShipping>} O Shipping criado e validado.
 *
 * @example
 * // Exemplo de payload
 * const payload = {
    orderId: number;
    address: string;
    city: string;
    postalCode: string;
    distance: number;
    shippingCost: number;
 * };
 *
 * const novoShipping = await createShippingService(payload);
 *
 * // Exemplo de resposta
 * {
    id: number;
    orderId: number;
    address: string;
    city: string;
    postalCode: string;
    distance: number;
    shippingCost: number;
    createdAt: Date;
    updatedAt: Date;
 * }
 */
const createShippingService = async (
  payload: iShippingCreate
): Promise<iShipping> => {
  // Criação do Shipping no banco de dados
  const createdShipping = await Shipping.create(payload);

  // Lançar erro caso a criação falhe
  if (!createdShipping) {
    throw new AppError("Não foi possível criar o Shipping", 409);
  }

  // Retornar o Shipping validado com o schema
  return shippingSchema.parse(createdShipping);
};
