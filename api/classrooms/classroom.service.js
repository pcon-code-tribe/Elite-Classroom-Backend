const pool = require('../../config/database');

module.exports = {
  createClassroom: ({ classCode, className, profID }) => {
    return new Promise(async (resolve, reject) => {
      let sql =
        'INSERT INTO classroom(class_code, class_name,prof_id) VALUES (?,?,?)';

      await pool.query(
        sql,
        [classCode, className, profID],
        (err, result, field) => {
          if (err) {
            return reject({
              status: 500,
              error: err,
            });
          }

          return resolve(result);
        }
      );
    });
  },
};
