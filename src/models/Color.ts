import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connect";
import { iColor, iColorCreate } from "../interfaces/color.interface";

class Color extends Model<iColor, iColorCreate> {
  declare id: number;
  declare name: string;
  declare hexCode: string;
}

Color.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hexCode: {
      type: DataTypes.STRING(7), // Código hexadecimal (#FFFFFF)
      allowNull: false,
      validate: {
        is: /^#[0-9A-Fa-f]{6}$/,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "Color",
  }
);

export default Color;
