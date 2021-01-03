const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config();

process.env.AWS_SDK_LOAD_CONFIG = 1;

aws.config.update({
    accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
    secretAccessKey: process.env["AWS_SECRET_KEY"],
    region: process.env['AWS_REGION']
  });
const s3 = new aws.S3();


const fileFilter = (req, file, cb) => {
     
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
        console.log("bue")
      cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
  };

const BUCKET_NAME = "mrandmrseatmedia";
const upload = multer({ 
    storage: multerS3({
      acl: "public-read",
      s3:s3,
      bucket: BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: "TESTING_METADATA" });
      },
      key: function (req, file, cb) {
        cb(null, file.originalname)
      },      
    }),
    fileFilter,
  });


module.exports = upload;