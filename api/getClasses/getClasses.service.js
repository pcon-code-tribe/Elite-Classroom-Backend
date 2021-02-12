const pool = require('../../config/database');

module.exports = {
  getClass: ({ google_token }) => {
    return new Promise(async (resolve, reject) => {
      let sql =
        'SELECT classes.class_code, classroom.class_name FROM classes JOIN classroom ON (classes.class_code = classroom.class_code) JOIN users ON (users.google_token = ?)';

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
