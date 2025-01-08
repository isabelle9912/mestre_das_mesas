import { AppError } from "../../errors";

import {
  iColor,
  iColorCreate,
  iColorUpdate,
} from "../../interfaces/color.interface";
import Color from "../../models/Color";
import { colorSchema } from "../../schemas/color.schema";

/**
 * Serviço para atualizar um Color.
 *
 * @async
 * @function updateColorService
 * @param {iColorUpdate} payload - Os dados necessários para atualizar a Cor.
 * @param {number} id - Identificação da Cor atualizar seus dados.
 * @throws {AppError} Caso a atualização da Cor falhe.
 * @returns {Promise<iColor>} A Cor atualizada e validada.
 *
 * @example
 * // Exemplo de payload
 * const payload = {
    name?: string;
    hexCode?: string;
 * };
 *
 * const updatedColor = await updateColorService(id, payload);
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
const updateColorService = async (
  id: number,
  payload: iColorUpdate
): Promise<iColor> => {
  const updatedColor = await Color.update(payload, { where: { id } });

  if (!updatedColor) {
    throw new AppError("Não foi possível atualizar a Cor", 409);
  }

  const retrivedColor = await Color.findOne({ where: { id } });

  return colorSchema.parse(retrivedColor);
};

export default updateColorService;
