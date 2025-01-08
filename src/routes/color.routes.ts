import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import {
  createColorController,
  deleteColorController,
  getAllColorController,
  updateColorController,
} from "../controllers/color.controllers";
import {
  colorCreateSchema,
  colorUpdateSchema,
} from "../schemas/color.schema";
import Color from "../models/Color";

const colorRoutes = Router();

/**
 * Rota para obter todos os colors de um apoiador pelo seu ID.
 *
 * @name GET /color/all/:id
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller getAllcolorIdController - Retorna os colors do apoiador.
 */
colorRoutes.get(
  "/all/:id",
  ensureTokenIsValidMiddleware,
  getAllColorController
);


/**
 * Rota para criar um novo color.
 *
 * @name POST /color
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller createcolorController - Cria um novo color.
 */
colorRoutes.post(
  "/",
  ensureDataIsValidMiddleware(colorCreateSchema),
  ensureTokenIsValidMiddleware,
  createColorController
);

/**
 * Rota para atualizar um color pelo seu ID.
 *
 * @name PATCH /color/:id
 * @middleware ensureExistsMiddleware - Verifica se o color existe.
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller updatecolorController - Atualiza o color solicitado.
 */
colorRoutes.patch(
  "/:id",
  ensureExistsMiddleware(Color, "Color"),
  ensureDataIsValidMiddleware(colorUpdateSchema),
  ensureTokenIsValidMiddleware,
  updateColorController
);

/**
 * Rota para deletar um color pelo seu ID.
 *
 * @name DELETE /color/:id
 * @middleware ensureExistsMiddleware - Verifica se o color existe.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller deletecolorController - Deleta o color solicitado.
 */
colorRoutes.delete(
  "/:id",
  ensureExistsMiddleware(Color, "Color"),
  ensureTokenIsValidMiddleware,
  deleteColorController
);

export default colorRoutes;
