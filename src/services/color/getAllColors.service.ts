import { AppError } from "../../errors";
import { iColor } from "../../interfaces/color.interface";
import Color from "../../models/Color";
import { colorSchema } from "../../schemas/color.schema";

/**
  * Serviço para buscar todos Colors.
 \*
  * @async
  * @function getAllColor
  * @throws {AppError} Caso não seja encontrado nenhum Color.
  * @returns {Promise<iColor[]>}  Os Colors encontrados e validados.
 \*
  * @example
  * // Exemplo de chamada
  * const retrivedColors = await getAllColor();
 \*
  * // Exemplo de retorno
 * {
    id: number;
    name: string;
    hexCode: string;
    createdAt: Date;
    updatedAt: Date;
 * }[]
 */

const getAllColor = async (): Promise<iColor[]> => {
  const retrivedColors = await Color.findAll();

  if (!retrivedColors) {
    throw new AppError("Não foi possível encontrar o Color!", 404);
  }
  return colorSchema.array().parse(retrivedColors);
};

export default getAllColor;
