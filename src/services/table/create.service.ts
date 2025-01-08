import { AppError } from "../../errors";
import { iTable, iTableCreate } from "../../interfaces/table.interface";
import Table from "../../models/Table";
import { tableSchema } from "../../schemas/table.schema";
/**
 * Serviço para criar uma nova Table.
 *
 * @async
 * @function createTableService
 * @param {iTableCreate} payload - Os dados necessários para criar a table.
 * @throws {AppError} Caso a criação da Table falhe.
 * @returns {Promise<iTable>} A Table criada e validada.
 *
 * @example
 * // Exemplo de payload
 * const payload = {
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    colorId: number;
    price: number;
 * };
 *
 * const novoTable = await createTableService(payload);
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
const createTableService = async (payload: iTableCreate): Promise<iTable> => {
  // Criação da Table no banco de dados
  const createdTable = await Table.create(payload);

  // Lançar erro caso a criação falhe
  if (!createdTable) {
    throw new AppError("Não foi possível criar a Table", 409);
  }

  // Retornar a Table validada com o schema
  return tableSchema.parse(createdTable);
};

export default createTableService;
