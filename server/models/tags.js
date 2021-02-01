const Sequelize = require("sequelize");
const db = require("../config/db");

const tags = db.define("tags", {
  name: {
    type: Sequelize.TEXT,
  },
})
module.exports = tags;