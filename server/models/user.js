const Sequelize = require("sequelize");
const db = require("../config/db");

const user = db.define("user", {
  name: {
    type: Sequelize.TEXT,
  },
  username: {
    type: Sequelize.TEXT,
  },
  password: {
    type: Sequelize.TEXT,
  },
});

module.exports = user;
