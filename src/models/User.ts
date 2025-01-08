import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";
import { hashSync } from "bcrypt";
import { iUser, iUserCreate } from "../interfaces/user.interface";

class User extends Model<iUser, iUserCreate> {
  declare id: number;
  declare name: string;
  declare phone: string;
  declare email: string;
  declare password: string;
  declare role: "admin" | "user";
  declare isTermAccepted: boolean;
  declare resetPasswordToken: string;
  declare resetPasswordExpires: string;
  declare deletedAt: Date | null;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255], // mínimo de 3 caracteres, máximo de 50 caracteres
      },
    },
    email: {
      type: DataTypes.STRING(55),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 120],
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        len: [10, 255],
      },
    },
    isTermAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Permitir valor nulo
      defaultValue: null, // Valor padrão é null
    },
  },
  { sequelize, modelName: "User" }
);

User.beforeCreate(async (user: any) => {
  const hashedPassword = hashSync(user.password, 10);
  user.password = hashedPassword;
});

User.beforeUpdate(async (user: any) => {
  if (user.changed("password")) {
    const hashedPassword = hashSync(user.password, 10);
    user.password = hashedPassword;
  }
});

export default User;
