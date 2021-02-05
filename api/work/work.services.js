const pool = require("../../config/database");
const AWS = require('aws-sdk');
const {uuid} = require('uuidv4');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = {
    uploadWork:(data, callback)=>{

        var originalName = data.originalname;
        var myfile = originalName.split('.');
        const fileType = myfile[myfile.length - 1];

        var params ={
            Bucket:process.env.S3_BUCKET_NAME,
            Key:`${uuid()}.${fileType}`,
            Body:data.buffer,
        }

        // console.log(params);
        //uploading the file to s3 bucket
        s3.upload(params,(err, data)=>{
            if(err){
                // console.log(err);
                return callback(err);
            }else{
                return callback(null,data);
            }
        })
    },
    deleteWork:(url,callback)=>{
        const myUrl = url.split('/');
        const s3obj = myUrl[myUrl.length - 1];

        const params = {
            Bucket:process.env.S3_BUCKET_NAME,
            Key:s3obj,
        };
        s3.deleteObject(params,(err, data)=>{
            if(err){
                callback(err);
            }else{
                console.log(`deleted object ${s3obj} from bucket ${process.env.AWS_BUCKET_NAME}`);
                callback(null,data);
            }
        });
    },
    checkUser:(uid,callback)=>{
        
        var sql = "SELECT * FROM users WHERE user_id = ?";
        pool.query(sql,[uid],(err,result,fields)=>{
            if(err){
                return callback(err);
            }else{
                return callback(null,result);
            }
        })
    },
    checkWork:(work_id,callback)=>{

        var sql = "SELECT * FROM class_works WHERE work_id = ?";

        pool.query(sql,[work_id],(err,result,fields)=>{
            if(err){
                return callback(err);
            }else{
                return callback(null,result);
            }
        })

    }
}