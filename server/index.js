const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const sess = require("express-session");
const path = require("path");

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
    secret: process.env["SECRET_SESSION"],
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
app.listen(PORT, "0.0.0.0", () => {
  console.log("server on port ", PORT);
});
// app.use(express.static(path.join(__dirname, "../", "client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
// });

module.exports = app;
