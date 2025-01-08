import { compare } from "bcrypt";
import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";
import { AppError } from "../../errors";
import {
  iUserUpdate,
  iUsersWithoutPass,
} from "../../interfaces/user.interface";
import { Op } from "sequelize";

const updateUsersService = async (
  id: number,
  payload: iUserUpdate
): Promise<iUsersWithoutPass> => {
  // Verificar se o username já está em uso por outro usuário

  if (payload.email) {
    const existingEmail = await User.findOne({
      where: { email: payload.email, id: { [Op.ne]: id } },
    });

    if (existingEmail) {
      throw new AppError("Email não disponível", 400);
    }
  }

  await User.update(payload, {
    where: { id, deletedAt: null },
  });

  const updatedUser = await User.findOne({ where: { id } });

  const updatedUserWithoutPass: iUsersWithoutPass =
    usersWithoutPassSchema.parse(updatedUser);

  return updatedUserWithoutPass;
};

export default updateUsersService;
