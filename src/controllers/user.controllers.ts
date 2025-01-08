import { z } from "zod";
import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import deleteUsersService from "../services/users/deleteUsers.service";
import getAllUsersService from "../services/users/getAllUsers.service";
import updateUsersService from "../services/users/updateUsers.service";
import {
  iUserUpdate,
} from "../interfaces/user.interface";

import getUsersIdService from "../services/users/getUsersId.service";

import forgotPasswordService from "../services/users/forgotPassword.service";
import resetPasswordService from "../services/users/resetPassword.service";

const getUserIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = Number(req.params.id);
  const retrivedUser = await getUsersIdService(id);

  return res.status(200).json(retrivedUser);
};

const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const allUsers = await getAllUsersService();

  return res.status(200).json(allUsers);
};

const createUsersController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const payload = req.body;
  
  const createdUser = await createUsersService(payload);

  return res.status(201).json(createdUser);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const payload: iUserUpdate = req.body,
    id = Number(req.params.id);

  const updatedUser = await updateUsersService(id, payload);

  return res.status(200).json(updatedUser);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = Number(req.params.id);

  await deleteUsersService(id);

  return res.status(204).send();
};

const forgotPasswordController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const email: string = req.body.email;

  await forgotPasswordService(email);

  return res.status(200).send("Sucesso! O link para redefinir a sua senha foi enviado para o seu email.");
};

const resetPasswordController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token } = req.params;
  const { password } = req.body;

  await resetPasswordService(token, password);

  return res.status(200).send("Senha redefinida, bitch");
};

export {
  getUserIdController,
  getAllUsersController,
  createUsersController,
  updateUsersController,
  deleteUsersController,
  resetPasswordController,
  forgotPasswordController,
};
