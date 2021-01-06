
const fs = require('fs');
const S3FS = require('s3fs')
const aws = require("aws-sdk");


const tempFolder = __dirname+"\\temp";

const imageReplacer =async ( body, title) => {
    const bucketName = process.env['BUCKET_NAME']
    let newEntry = '';
    
    const s3fsImpl = new S3FS(bucketName, {
        accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
        secretAccessKey: process.env["AWS_SECRET_KEY"],
        region: process.env['AWS_REGION']
    });
  
    for await (const file of fs.readdirSync(tempFolder)){
            let filePath = tempFolder+"\\"+file;
            console.log("file",file) 
            console.log("start of upload",filePath ) 
            fs.readFile(filePath, async (err, fileToUpload) =>{
                    if (err){
                        console.log("err",err)
                    }
                    else{

                    var stream = fs.createReadStream(filePath);
                    const fileName = bucketName+"\\"+title+ "\\"+file  
                    await s3fsImpl.writeFile(fileName, stream)
                    .then(function () {
                            console.log('It\'s saved!');                                      
                            });
                        }
    
                                
            })    
        }
}


module.exports = imageReplacer;




       //     const s3 = new aws.S3({params: {Bucket: title}});
            //     s3.createBucket(function () {
            //         var params = {
            //             Key: file, //file.name doesn't exist as a property
            //             Body: body,
            //             ContentEncoding: 'base64',
            //             ACL: "public-read"
            //         };

                
            //     s3.upload(params, function (err, fileToUpload) {
            //         if (err){
            //             console.log(err)
            //         }
            //         else{
            //             console.log("success")
            //         }
            //     })
            // });