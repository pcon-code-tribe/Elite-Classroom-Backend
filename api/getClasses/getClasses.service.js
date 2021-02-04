const pool = require('../../config/database');

module.exports = {
  getClass: ({ reg_id }) => {
    return new Promise(async (resolve, reject) => {
      let sql =
        'SELECT classroom.class_name, classroom.class_code, classroom.prof_id, users.registration_no FROM classroom, classes, users WHERE users.registration_no = ? AND classes.user_id = users.user_id';

      await pool.query(sql, [reg_id], (err, result, field) => {
        if (err) {
          return reject({
            status: 500,
            error: err,
          });
        }

        return resolve(result);
      });
    });
  },
};
