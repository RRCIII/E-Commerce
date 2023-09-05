const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTERGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTabkeName: true,
    underscored: true,
    modelName: "category",
  }
);

module.export = Category;