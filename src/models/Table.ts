import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connect";
import Color from "./Color";
import { iTable, iTableCreate } from "../interfaces/table.interface";

class Table extends Model<iTable, iTableCreate> {
  declare id: number;
  declare dimensions: { length: number; width: number; height: number };
  declare colorId: number;
  declare price: number;
}

Table.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dimensions: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidDimensions(value: any) {
          if (!value.length || !value.width || !value.height) {
            throw new Error(
              "Dimensões devem incluir comprimento, largura e altura."
            );
          }
          if (value.length < 30 || value.width < 30 || value.height < 30) {
            throw new Error("As dimensões mínimas são 30cm para cada eixo.");
          }
        },
      },
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Color,
        key: "id",
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: "O preço deve ser um número válido." },
        min: { args: [0], msg: "O preço deve ser maior ou igual a 0." },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "Table",
  }
);

// Relacionamento com Color
Table.belongsTo(Color, { foreignKey: "colorId" });
Color.hasMany(Table, { foreignKey: "colorId" });

export default Table;
