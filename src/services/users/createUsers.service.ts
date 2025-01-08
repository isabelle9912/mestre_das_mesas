import { AppError } from "../../errors";
import {
  iUserCreate,
  iUsersWithoutPass,
} from "../../interfaces/user.interface";
import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";

// Serviço principal
const createUsersService = async (
  payload: iUserCreate // Recebe o payload bruto
): Promise<iUsersWithoutPass> => {
  const userExist = await User.findOne({ where: { email: payload.email } });

  // Verifica se o e-mail já existe
  if (userExist) {
    throw new AppError("Email já existe!", 409);
  }

  const createdUser = await User.create(payload);

  return usersWithoutPassSchema.parse(createdUser);
};

export default createUsersService;
