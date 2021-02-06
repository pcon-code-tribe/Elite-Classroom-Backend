const pool = require('../../../config/database');

module.exports = {
    getSubmission :(sid, callback) =>{
        const sql = "SELECT * FROM work_submission WHERE submission_id=?";
        
        pool.query(sql,[sid],(err,result,fields)=>{
            if(err){
                console.log(err);
                callback(err);
            }else{
                callback(null,result);
            }
        });
    },
    deleteSubmission:(sid,callback)=>{
        const sql = "DELETE FROM work_submission WHERE submission_id=?";
        pool.query(sql,[sid],(err,result,fields)=>{
            if(err){
                console.log(err);
                callback(err);
            }else{
                callback(null,result);
            }
        })
    },
}