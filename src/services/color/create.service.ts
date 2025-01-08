import { AppError } from "../../errors";
import { iColor, iColorCreate } from "../../interfaces/color.interface";
import Color from "../../models/Color";
import { colorSchema } from "../../schemas/color.schema";
/**
 * Serviço para criar um novo Color.
 *
 * @async
 * @function createColorService
 * @param {iColorCreate} payload - Os dados necessários para criar a cor.
 * @throws {AppError} Caso a criação do Cor falhe.
 * @returns {Promise<iColor>} A cor criada e validada.
 *
 * @example
 * // Exemplo de payload
 * const payload = {
    name: string;
    hexCode: string;
 * };
 *
 * const novoColor = await createColorService(payload);
 *
 * // Exemplo de resposta
 * {
    id: number;
    name: string;
    hexCode: string;
    createdAt: Date;
    updatedAt: Date;
 * }
 */
const createColorService = async (payload: iColorCreate): Promise<iColor> => {
  // Criação da Cor no banco de dados
  const createdColor = await Color.create(payload);

  // Lançar erro caso a criação falhe
  if (!createdColor) {
    throw new AppError("Não foi possível criar a cor", 409);
  }

  // Retornar a Cor validada com o schema
  return colorSchema.parse(createdColor);
};

export default createColorService;
