const pool = require("../../../config/database");

module.exports = {
    read_from_db : (sql,params,callback)=>{
        pool.query(sql,params,(err,result,field)=>{
            if(err){
                return callback(err);
            }else{
                return callback(null,result);
            }
        })
    },
}