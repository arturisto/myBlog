const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require("./routes/index");
//database

const db = require("./config/db");

//testDB

db.authenticate()
    .then(() => console.log('database connected'))
    .catch(err =>console.log("Error ",err))

//middleware

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req,res, next) => {

    next();
})
//routes

 app.use("/", routes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () =>{
    console.log("server on port 5000")

})

module.exports = app;

