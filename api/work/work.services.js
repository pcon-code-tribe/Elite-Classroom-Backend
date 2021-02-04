const AWS = require('aws-sdk');
const {uuid} = require('uuidv4');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
});

module.exports = {
    uploadWork:(data, callback)=>{

        var originalName = data.originalname;
        var myfile = originalName.split('.');
        const fileType = myfile[myfile.length - 1];

        var params ={
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:`${uuid()}.${fileType}`,
            Body:data.buffer,
        }

        console.log(params);
        //uploading the file to s3 bucket
        s3.upload(params,(err, data)=>{
            if(err){
                // console.log(err);
                return callback(err);
            }else{
                return callback(null,data);
            }
        })
    }
}