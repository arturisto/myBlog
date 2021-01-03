const express = require('express')
const router = express.Router();
const User = require("../models/user");
const Blogpost = require("../models/blogpost");
// const AWS = require('aws-sdk');

const imageUpload = require('../utils/imageUploader')
const singleUpload = imageUpload.single('image');


router.post("/blogmanage/uploadimage", async (req,res)=>{
     console.log("upload start")
     singleUpload(req, res, function(err) {
        if (err) {
            console.log(err.message)
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        console.log(req.file.location);
        return res.json({'imageUrl': req.file.location});
      });
});

router.post("/login" , async (req,res) => {

    try{
            const user = await User.findOne({ where: { username: req.body.username, password: req.body.password } })
            console.log(user)
            return res.status(200).json({msg:"success"});
        }
        catch{
            res.status(404).json({msg:"user not found"});
        }
});

router.post("/blogmanage/savenewentry", async (req,res)=>{
    const data = {
        title: "test",
        metatitle: "meta",
        content: req.body,
    };

    let {  title, metatitle, content } = data;
    try {
        Blogpost.create({
            title,
            metatitle,
            content 
        })
            .then(() =>res.status(200).json({
                status:"success"
            }))
            .catch(err => console.log("error", err));
    } catch (error) {
        
    }
});

router.post("/blogmanage/getnewentry", async (req,res)=>{

    console.log("hi from backend")
    const blogEntry = await Blogpost.findOne({ where: { id :"10018" } })
    console.log(blogEntry.content)
    res.status(200).json({msg:"success", body:blogEntry});

});
module.exports = router;
