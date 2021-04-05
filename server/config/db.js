const Sequelize = require("sequelize");
const db = new Sequelize("testdb", "postgres", "1", {
  host: process.env["DATABASE_URL"],
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquaire: 30000,
    idle: 5000,
  },
});

module.exports = db;
