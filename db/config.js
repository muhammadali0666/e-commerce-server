const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv")

dotenv.config()

const sequelize = new Sequelize.config({
  username: "postgres",
  database: "e-commerce_db",
  password: process.env.PASSWORD,
  port: 5432,
  host: "localhost",
  dialect: "postgres",
  logging: false
});

sequelize
  .authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

module.exports = {
  sequelize,
  DataTypes,
};
