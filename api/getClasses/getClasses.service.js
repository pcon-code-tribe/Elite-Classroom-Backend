const pool  = require('../../config/database');

module.exports = {

    getClass: ({reg_id}) =>{

        return new Promise ( async (resolve, reject) =>{

            let sql = 'SELECT class_name, class_code, joined_on FROM classes INNER JOIN users ON classes.user_id = users.user_id WHERE users.registration_no = ?';

            await pool.query(sql, [reg_id], 
                (err, result, field) =>{

               if(err){
                   return reject({
                       status: 500,
                       error: err
                   });
               }

               return resolve (result);
            });
        });    
    },
};