const { DataTypes, sequelize } = require("../db/config");
const { UUIDV4 } = require("sequelize");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  new_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  old_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  avilable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
});

module.exports = Product;
