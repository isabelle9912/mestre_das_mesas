import { AppError } from "../../errors";

import { iTable, iTableUpdate } from "../../interfaces/table.interface";
import Table from "../../models/Table";
import { tableSchema } from "../../schemas/table.schema";

/**
 * Serviço para atualizar um Table.
 *
 * @async
 * @function updateTableService
 * @param {iTableUpdate} payload - Os dados necessários para atualizar a Table.
 * @param {number} id - Identificação da Table atualizar seus dados.
 * @throws {AppError} Caso a atualização da Table falhe.
 * @returns {Promise<iTable>} A Table atualizada e validada.
 *
 * @example
 * // Exemplo de payload
 * const payload = {
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    colorId?: number;
    price?: number;
 * };
 *
 * const updatedTable = await updateTableService(id, payload);
 *
 * // Exemplo de resposta
 * {
    id: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    colorId: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
 * }
 */
const updateTableService = async (
  id: number,
  payload: iTableUpdate
): Promise<iTable> => {
  const updatedTable = await Table.update(payload, { where: { id } });

  if (!updatedTable) {
    throw new AppError("Não foi possível atualizar a Table", 409);
  }

  const retrivedTable = await Table.findOne({ where: { id } });

  return tableSchema.parse(retrivedTable);
};

export default updateTableService;
