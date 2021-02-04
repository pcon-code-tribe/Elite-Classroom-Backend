const pool = require('../../config/database');

module.exports = {

    joinClassroom : ({reg_id, classCode}) =>{

        return new Promise (async (resolve, reject) =>{

            let sql = 'INSERT INTO classes SET user_id = (SELECT user_id FROM users WHERE registration_no = ?), class_code = ?, class_name = (SELECT class_name FROM classroom WHERE class_code = ?)';

            await pool.query(sql, [reg_id, classCode, classCode], 
                (err, result, field) =>{

                if(err){

                    return reject({
                        status: 500,
                        error: err
                    });
                }

                return resolve(result);
            });
        });
    }
};