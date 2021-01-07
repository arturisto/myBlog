const fs = require('fs');
const S3FS = require('s3fs')
const aws = require("aws-sdk");


const tempFolder = __dirname+"\\temp";
const bucketUrl = "https://mrandmrseatmedia.s3.us-east-2.amazonaws.com/"
const localHostPath = "http://localhost:8000\\MrMsEat_App\\mr-mrs-app\\server\\utils\\temp\\"

const imageReplacer =async ( body, title) => {
    const bucketName = process.env['BUCKET_NAME']
    let newEntry = body;
    const trimedTitle =  title.replace(/\s/g, '');
    const s3fsImpl = new S3FS(bucketName, {
        accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
        secretAccessKey: process.env["AWS_SECRET_KEY"],
        region: process.env['AWS_REGION'],
    });
    
    for await (const file of fs.readdirSync(tempFolder)){

            let filePath = tempFolder+"\\"+file;


            // eslint-disable-next-line no-loop-func
            await fs.readFile(filePath, async (err, fileToUpload, options) =>{
                    if (err){
                        console.log("err",err)
                    }
                    else{
                    var stream = fs.createReadStream(filePath);
                    const fileName = bucketName+"/"+trimedTitle+ "/"+file
                    const options = {
                        ACL:'public-read'
                    }  
                    await s3fsImpl.writeFile(fileName, stream, options)
                    .then(function (res) {
                            let newUrl =  bucketUrl+trimedTitle+"/"+file;
                            // console.log("old path",localHostPath+file)
                            // console.log(newUrl)
                            // console.log(newEntry)

                            let oldPath =localHostPath+file
                                console.log("old path",oldPath)
                            console.log(newUrl)
                            console.log(newEntry)

                            newEntry = newEntry.replace(oldPath,newUrl); 
                            console.log("new",newEntry)                    
                            });
                        }
    
                                
            })    
        
    }
        console.log("return",newEntry)
        return newEntry
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