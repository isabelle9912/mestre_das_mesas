import { Request, Response } from "express";
import createTableService from "../services/table/create.service";
import {
  iTable,
  iTableCreate,
  iTableUpdate,
} from "../interfaces/table.interface";
import updateTableService from "../services/table/update.service";
import deleteTableIdService from "../services/table/deleteTable.service";
import getTableId from "../services/table/getTableId.service";
/**
 * Obtém uma Table pelo seu id.
 * 
 * @async
 * @function getTableIdController
 * @param {Request} req - Objeto de requisição do Express contendo o id.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Tables encontrados.
 * @throws {404} - Caso os Tables não sejam encontrados.
 * 
 * @example
 * // GET /table
 * // Response:
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
}
 */

const getTableIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id: number = Number(req.params.id);
  const table: iTable = await getTableId(id);

  return res.status(200).json(table);
};

/**
 * Cria um novo Table.
 *
 * @async
 * @function createTableController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 201 - Table criado com sucesso.
 * @throws {409} - Caso o Table não seja criado.
 *
 *
 * @example
 * // POST /table
 * // Body:
 * {
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    colorId: number;
    price: number;
 * }
 * // Response:
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
const createTableController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const payload: iTableCreate = req.body;

  const createdTable: iTable = await createTableService(payload);

  return res.status(201).json(createdTable);
};

/**
 * Atualiza um Table pelo seu ID.
 *
 * @async
 * @function updateTableController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Table atualizado com sucesso.
 * @throws {409} - Caso o Table não seja atualizado.
 *
 * @example
 * // PATCH /table/10
 * // Body:
 * {
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    colorId?: number;
    price?: number;
 * }
 * // Response:
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

const updateTableController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const payload: iTableUpdate = req.body,
    id = Number(req.params.id);

  const updatedTable = await updateTableService(id, payload);

  return res.status(200).json(updatedTable);
};

/**
 * Deleta um Table pelo seu ID.
 *
 * @async
 * @function deleteTableController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 204 - Table deletado com sucesso.
 *
 * @example
 * // DELETE /table/10
 */

const deleteTableController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = Number(req.params.id);

  await deleteTableIdService(id);

  return res.status(204).send();
};

export {
  getTableIdController,
  createTableController,
  updateTableController,
  deleteTableController,
};
