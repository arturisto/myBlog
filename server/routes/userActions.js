const express = require('express')
const router = express.Router();
const User = require("../models/user");
const Blogpost = require("../models/blogpost");
// const AWS = require('aws-sdk');
const blogImageReplacer = require('../utils/blogImageReplacer')
const imageUploader = require("../utils/imageUploader")

const uploadImage = require('../utils/saveImageLocaly')

router.post("/blogmanage/uploadimage", async (req,res)=>{
  
    const imgUpload = uploadImage.single("image")
    
    imgUpload(req, res, function(err) {
    
        if (err) {
            // console.log(err.message)
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }

        const httpPath = 'http://localhost:8000'
        const newPath = req.file.path.replace("D:",httpPath)
        const resp = res.json({'imageUrl': newPath})

    
        console.log("path",newPath)
        return resp;
      });
    
    //  singleUpload(req, res, function(err) {
    //     if (err) {
    //         console.log(err.message)
    //       return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    //     }
    //     console.log(req.file.location);
    //     return res.json({'imageUrl': req.file.location});
    //   });
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

    try{

        const uplaodedImagesUrls = await imageUploader(req.body.title)
        console.log("old entry",req.body.newBlogEntry)
        let newEntry =blogImageReplacer( req.body.newBlogEntry,uplaodedImagesUrls)
        console.log("new entry",newEntry)

        }

    
    catch (error){
        console.log("outside error", error)
    }



    // console.log("new entry",newEntry)

    // const data = {
    //     title: "test",
    //     metatitle: "meta",
    //     content: req.body,
    // };

    // let {  title, metatitle, content } = data;
    // try {
    //     Blogpost.create({
    //         title,
    //         metatitle,
    //         content 
    //     })
    //         .then(() =>res.status(200).json({
    //             status:"success"
    //         }))
    //         .catch(err => console.log("error", err));
    // } catch (error) {
        
    // }
});

router.post("/blogmanage/getnewentry", async (req,res)=>{

    console.log("hi from backend")
    const blogEntry = await Blogpost.findOne({ where: { id :"10018" } })
    console.log(blogEntry.content)
    res.status(200).json({msg:"success", body:blogEntry});

});
module.exports = router;
