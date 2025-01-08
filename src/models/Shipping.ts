import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connect";
import { iShipping, iShippingCreate } from "../interfaces/shipping.interface";
import Order from "./Order";

class Shipping extends Model<iShipping, iShippingCreate> {
  declare id: number;
  declare orderId: number;
  declare address: string;
  declare city: string;
  declare postalCode: string;
  declare distance: number; // distância em km
  declare shippingCost: number; // custo total do frete
}

Shipping.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: {
      type: DataTypes.INTEGER,
      references: { model: Order, key: "id" },
      allowNull: false,
    },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 1, // Distância mínima de 1km
      },
    },
    shippingCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: { type: DataTypes.DATE },
  },
  { sequelize, modelName: "Shipping" }
);

export default Shipping;
