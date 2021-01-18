const express = require('express')
const router = express.Router();
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
router.post("/", (req, res) => {
    getAll();
});
//add ite

router.post("/add", (req, res) => {
    const data = {
        title: "hello",
        metatitle: "meta",
        content: "hello there all!",
    };

    let {title, metatitle, content } = data;
    blogpost.create({
        title,
        metatitle,
        content 
    })
        .then(test =>res.status(200).json({
            status:"success"
        }))
        .catch(err => console.log("error", err));

});


module.exports = router;
