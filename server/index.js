const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const sess = require("express-session");
//database

const db = require("./config/db");

// //testDB

db.authenticate()
  .then(() => console.log("database connected"))
  .catch((err) => console.log("Error ", err));

//middleware

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(
  sess({
    secret: process.env["SESSION_KEY"],
    resave: false,
    saveUninitialized: false,
  })
);
app.use((res, req, next) => {
  next();
});

//securities??
const jwt = require("jsonwebtoken");
//routes

app.use("/", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server on port 5000");
});

module.exports = app;
