import { AppError } from "../../errors";
import { iUsersWithoutPass } from "../../interfaces/user.interface";
import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";

const getUsersIdService = async (id: number): Promise<iUsersWithoutPass> => {
  const retrivedUser = await User.findOne({
    where: { id, deletedAt: null },
  });

  return usersWithoutPassSchema.parse(retrivedUser);
};

export default getUsersIdService;
