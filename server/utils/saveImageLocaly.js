const multer = require("multer");
require('dotenv').config();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+"/temp")
    },
    
    filename: function (req, file, cb) {
      cb(null, file.originalname) //Appending .jpg
    }
  })
  
const upload = multer({ storage: storage});

module.exports = upload;