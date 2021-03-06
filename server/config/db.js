const Sequelize = require("sequelize");
const fs = require('fs');
console.log(
  "hi ",
  process.env["DATABASE_NAME"],
  process.env["DATABASE_USERNAME"],
  process.env["DATABASE_PASSWORD"],
  process.env["DATABASE_HOST"],
  process.env["DATABASE_PORT"]
);

let db = null;
if( process.env["NODE_ENV"] === "DEV"){
  db = new Sequelize(
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
    }
  );
}
else{
  const rdsCa = fs.readFileSync(process.env["SSL_CERT"]);
  const ssl = {
    ssl: {
      require: true,
      rejectUnauthorized: true,
      ca: [rdsCa]
    },
  };
  const options =  ssl;
  db = new Sequelize(
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
}  
module.exports = db;
