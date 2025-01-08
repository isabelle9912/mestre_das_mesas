import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connect";
import Table from "./Table";
import User from "./User";
import { iOrder, iOrderCreate } from "../interfaces/order.interface";

class Order extends Model<iOrder, iOrderCreate> {
  declare id: number;
  declare tableId: number;
  declare idUser: number;
  declare status: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tables",
        key: "id",
      },
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "inProduction", "shipped", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: { type: DataTypes.DATE },
  },
  { sequelize, modelName: "Order" }
);

// Relacionamentos
Order.belongsTo(Table, { foreignKey: "tableId" });
Table.hasMany(Order, { foreignKey: "tableId" });

Order.belongsTo(User, { foreignKey: "idUser" });
User.hasMany(Order, { foreignKey: "idUser" });

export default Order;
