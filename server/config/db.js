const Sequelize = require("sequelize");

console.log(
  process.env["DATABASE_NAME"],
  process.env["DATABASE_USERNAME"],
  process.env["DATABASE_PASSWORD"],
  process.env["DATABASE_HOST"]
);
const ssl = {
  ssl: process.env["PGSSLMODE"],
};
const options = process.env["NODE_ENV"] === "DEV" ? {} : ssl;
const db = new Sequelize(
  process.env["DATABASE_NAME"],
  process.env["DATABASE_USERNAME"],
  process.env["DATABASE_PASSWORD"],
  {
    host: process.env["DATABASE_HOST"],
    dialect: "postgres",
    protocol: "postgres",
    logging: console.log,
    timeout: 6000,
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
