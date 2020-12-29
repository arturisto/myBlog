const express = require('express')
const router = express.Router();
const db = require("../config/db");
const blogpost = require("../models/blogpost");


async function getAll(){
    try {
        const alldata = await blogpost.findAll();
        console.log("alldata",alldata)
    } catch (error) {
        console.log("error:", error)

    }

};  

//get
router.get("/", (req, res) => {
    getAll();

    console.log("hello there")
});

//add item


router.get("/add", (req, res) => {
    const data = {
        title: "hello",
        metatitle: "meta",
        content: "hello there all!",
    };

    let { id, title, metatitle, content } = data;



    blogpost.create({
        title,
        metatitle,
        content
    })
        .then(test => res.redirect("/"))
        .catch(err => console.log("error", err)) ;

});


module.exports = router;
