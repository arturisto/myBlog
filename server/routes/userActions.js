const express = require('express')
const fs = require('fs');
const router = express.Router();
const User = require("../models/user");
const Blogpost = require("../models/blogpost");
const AWS = require('aws-sdk');
require('dotenv').config();




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

router.post("/blogmanage/uploadimage", async (req,res)=>{
    // console.log(req.body)
    // const fileContent = fs.readFileSync(req.body);
    const s3 = new AWS.S3({
        accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
        secretAccessKey: process.env["AWS_SECRET_KEY"],
        region: process.env['AWS_REGION']
      });
    const BUCKET_NAME = "mrandmrseatmedia";
    var base64data = new Buffer.from( 'binary',req.body,);
    const params = {
        Bucket: BUCKET_NAME,
        Key: "test/test.jpg",
        Body: base64data
    }
    
    s3.upload(params, function (err,data){
        if (err){
            console.log(err)
        }
        console.log(`File uploaded successfully. ${data.Location}`);

    })
   

});



module.exports = router;
