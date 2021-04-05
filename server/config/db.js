const Sequelize = require("sequelize");
console.log("hi db");
const db = new Sequelize(process.env["DATABASE_URL"], {
  dialect: "postgres",
  protocol: "postgres",
});

module.exports = db;
