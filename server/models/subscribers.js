const Sequelize = require("sequelize");
const db = require("../config/db");

const subscribers = db.define("subscribers", {
  email: {
    type: Sequelize.STRING,
  },
});
module.exports = subscribers;
