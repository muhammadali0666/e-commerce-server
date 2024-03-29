const { DataTypes, sequelize } = require("../db/config");
const { UUIDV4 } = require("sequelize");

const Auth = sequelize.define("auth",{
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
  }
});


module.exports = Auth
