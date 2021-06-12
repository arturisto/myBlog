const Sequelize = require("sequelize");

console.log(
  "hi ",
  process.env["DATABASE_NAME"],
  process.env["DATABASE_USERNAME"],
  process.env["DATABASE_PASSWORD"],
  process.env["DATABASE_HOST"],
  process.env["DATABASE_PORT"]
);
const ssl = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};
const options = process.env["NODE_ENV"] === "DEV" ? {} : ssl;
const db = new Sequelize(
  process.env["DATABASE_NAME"],
  process.env["DATABASE_USERNAME"],
  process.env["DATABASE_PASSWORD"],
  {
    host: process.env["DATABASE_HOST"],
    port: process.env["DATABASE_PORT"],
    dialect: "postgres",
    protocol: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: options,
  }
);
module.exports = db;
