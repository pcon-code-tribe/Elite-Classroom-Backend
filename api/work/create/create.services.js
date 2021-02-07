const pool = require("../../../config/database");
const AWS = require('aws-sdk');
const {uuid} = require('uuidv4');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
});

module.exports = {
    submitWork:(data, callback)=>{
        const sql = "INSERT INTO work_submission (user_id,work_id,work,attachment,submitted_on) VALUES (?,?,?,?,?)";
         pool.query(sql,[data.user_id,data.work_id,data.work,data.attachment,data.submitted_on],(err,result,fields)=>{
             if(err){
                 return callback(err);
             }else{
                 return callback(null,result);
             }
         });
    }
}