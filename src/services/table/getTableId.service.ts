import { AppError } from "../../errors";
import { iTable } from "../../interfaces/table.interface";
import Table from "../../models/Table";
import { tableSchema } from "../../schemas/table.schema";

/**
  * Serviço para buscar todos Tables.
 \*
  * @async
  * @function getTableId
  * @param {[number]} id - Número que identifica a Table.
  * @throws {AppError} Caso não seja encontrada a Table.
  * @returns {Promise<iTable>}  A Table encontrada e validada.
 \*
  * @example
  * // Exemplo de chamada
  * const retrivedTables = await getTableId(2);
 \*
  * // Exemplo de retorno
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

const getTableId = async (id: number): Promise<iTable> => {
  const retrivedTables = await Table.findOne({ where: { id } });

  if (!retrivedTables) {
    throw new AppError("Não foi possível encontrar a Table!", 404);
  }
  return tableSchema.parse(retrivedTables);
};

export default getTableId;
