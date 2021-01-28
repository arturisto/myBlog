//utils
const getPreviewImageUrl = require( "../utils/getPreviewImageUrl")

const express = require('express')
const router = express.Router();
const Blogpost = require("../models/blogpost");




async function getAll(){
    try {
        const alldata = await Blogpost.findAll();
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

router.get("/getlatest", async(req,res)=>{

    try {
        const blogEntries = await Blogpost.findAll({
            limit:3,
            order:[["publishedAt" ,'DESC']] , 
        });

        const blogEntiresWithPreviewURLs = getPreviewImageUrl(blogEntries)
        res.status(200).json({posts: blogEntiresWithPreviewURLs})
    } catch (error) {
        console.log(error)
    }
   
    

});


module.exports = router;
