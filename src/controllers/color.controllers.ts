import { Request, Response } from "express";
import getAllColor from "../services/color/getAllColors.service";
import createColorService from "../services/color/create.service";
import {
  iColor,
  iColorCreate,
  iColorUpdate,
} from "../interfaces/color.interface";
import updateColorService from "../services/color/update.service";
import deleteColorIdService from "../services/color/deleteColor.service";

/**
 * Obtém todos Colors.
 * 
 * @async
 * @function getAllColorController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Colors encontrados.
 * @throws {404} - Caso os Colors não sejam encontrados.
 * 
 * @example
 * // GET /color
 * // Response:
 * {
    id: number;
    name: string;
    hexCode: string;
    createdAt: Date;
    updatedAt: Date;
}[]
 */

const getAllColorController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const allColors = await getAllColor();

  return res.status(200).json(allColors);
};

/**
 * Cria um novo Color.
 *
 * @async
 * @function createColorController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 201 - Color criado com sucesso.
 * @throws {409} - Caso o Color não seja criado.
 *
 *
 * @example
 * // POST /color
 * // Body:
 * {
 *   name: string;
 *   hexCode: string;
 * }
 * // Response:
 * {
    id: number;
    name: string;
    hexCode: string;
    createdAt: Date;
    updatedAt: Date;
 * }
 */
const createColorController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const payload: iColorCreate = req.body;

  const createdColor: iColor = await createColorService(payload);

  return res.status(201).json(createdColor);
};

/**
 * Atualiza um Color pelo seu ID.
 *
 * @async
 * @function updateColorController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Color atualizado com sucesso.
 * @throws {409} - Caso o Color não seja atualizado.
 *
 * @example
 * // PATCH /color/10
 * // Body:
 * {
 *  name?: string;
 *  hexCode?: string;
 * }
 * // Response:
 * {
 *  id: number;
 *  name: string;
 *  hexCode: string;
 *  createdAt: Date;
 *  updatedAt: Date;
 * }
 */

const updateColorController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const payload: iColorUpdate = req.body,
    id = Number(req.params.id);

  const updatedColor = await updateColorService(id, payload);

  return res.status(200).json(updatedColor);
};

/**
 * Deleta um Color pelo seu ID.
 *
 * @async
 * @function deleteColorController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 204 - Color deletado com sucesso.
 *
 * @example
 * // DELETE /color/10
 */

const deleteColorController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = Number(req.params.id);

  await deleteColorIdService(id);

  return res.status(204).send();
};

export {
  getAllColorController,
  createColorController,
  updateColorController,
  deleteColorController,
};
