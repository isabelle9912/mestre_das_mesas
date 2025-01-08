import { AppError } from "../../errors";
import { iShipping } from "../../interfaces/shipping.interface";
import Shipping from "../../models/Shipping";
import { shippingSchema } from "../../schemas/shipping.schema";

/**
  * Serviço para buscar todos Shippings.
 \*
  * @async
  * @function getShippingId
  * @param {[number]} id - Número que identifica o Shipping.
  * @throws {AppError} Caso não seja encontrada o Shipping.
  * @returns {Promise<iShipping>}  A Shipping encontrado e validado.
 \*
  * @example
  * // Exemplo de chamada
  * const retrivedShipping = await getShippingId(2);
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

const getShippingId = async (id: number): Promise<iShipping> => {
  const retrivedShipping = await Shipping.findOne({ where: { id } });

  if (!retrivedShipping) {
    throw new AppError("Não foi possível encontrar o Shipping!", 404);
  }
  return shippingSchema.parse(retrivedShipping);
};

export default getShippingId;