const pool = require('../../config/database');

module.exports = {
  getClass: ({ google_token }) => {
    return new Promise(async (resolve, reject) => {
      let sql =
        'SELECT classroom.class_name, classroom.class_code, classroom.owner_id, (SELECT name FROM users WHERE classroom.owner_id = users.user_id) as owner_name FROM classroom, users, classes WHERE users.google_token = ? AND classes.user_id = users.user_id';

      await pool.query(sql, [google_token], (err, result, field) => {
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
