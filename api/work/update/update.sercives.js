const pool = require('../../../config/database');

module.exports = {
    update:(data, callback)=>{
        const sql = "UPDATE work_submission SET attachment=?, submitted_on=? WHERE submission_id=?";
        const param =  [data.attachment,data.submitted_on,data.submission_id];
        
        pool.query(sql,param,(err,result,field)=>{
            if(err) {
                return callback(err);
            }else{
                return callback(null,result);
            }
        });
    }
}