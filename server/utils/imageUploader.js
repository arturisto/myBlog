/* eslint-disable no-loop-func */
const { text } = require('body-parser');
const fs = require('fs');
const S3FS = require('s3fs')


const tempFolder = __dirname+"\\temp";
const bucketUrl = "https://mrandmrseatmedia.s3.us-east-2.amazonaws.com/";
const localHostPath = "http://localhost:8000\\MrMsEat_App\\mr-mrs-app\\server\\utils\\temp\\";

//main function

const imageReplacer = async (title)=> {
    
    //promise of all the entire proccess of upload
    return new Promise((resolve, reject) => {
        //reading of the images in sync order (blocking)    
        const files = fs.readdirSync(tempFolder);
        let filesToUpload = [];
        //adding files to iteratable form promise all
        for(const file of files){
            filesToUpload.push(uploadImages(file,title))
        };
        //allSettled allows to proccess both erroneous and not erroneus items. 
        //The otuput will be:[{status: ,value:} for each promise] 
        Promise.allSettled(filesToUpload)
        .then((data) =>{
            resolve(data);
        })
        .catch((error)=>{
            console.log("error",error);
            reject(error);
        });
    }) ;         
};
//uploading proccess
function uploadImages (file, title){
    const bucketName = process.env['BUCKET_NAME'];
    const trimedTitle =  title.replace(/\s/g, '');
    const s3fsImpl = new S3FS(bucketName, {
        accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
        secretAccessKey: process.env["AWS_SECRET_KEY"],
        region: process.env['AWS_REGION'],
    });  

    let filePath = tempFolder+"\\"+file;
    let stream = fs.createReadStream(filePath);
    //local path inside S3 bucket
    const fileName = bucketName+"/"+trimedTitle+ "/"+file;

    const options = {
         ACL:'public-read'
    }  ;
    //promise for a single upload                
    return new Promise((resolve, reject)=>{
        //write file to buclet
        s3fsImpl.writeFile(fileName, stream, options)
        .then(function (res) {
             let newUrl =  bucketUrl+trimedTitle+"/"+file; 
             let oldPath =localHostPath+file;
             resolve([oldPath,newUrl])  ;
             })
         .catch(error => {
             reject(error);
         }); 
    });
    
    
};
module.exports = imageReplacer;   