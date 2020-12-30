const express = require('express')
const router = express.Router();
const User = require("../models/user");




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

module.exports = router;
