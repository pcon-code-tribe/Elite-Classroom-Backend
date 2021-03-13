const pool = require('../config/database');

module.exports.findUserByToken = async (google_token,callback) =>{

    if(!google_token){
        return callback({
            code:422,
            message:'Google token not found or null'
        });
    }

    const sql = 'SELECT * FROM users WHERE google_token = ?';

    pool.query(sql,[google_token],(err,result,fields)=>{

        if(err){
            console.log(err);
            return callback(err);
        };

        if(!result || result.length === 0){
            return callback({
                code:404,
                message:'User not found with current google_token'
            });
        }else{
            return callback(null,{
                code:200,
                message:'user found',
                name:result[0].name
            });
        }
    })

}