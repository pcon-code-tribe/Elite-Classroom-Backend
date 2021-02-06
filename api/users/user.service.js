const pool = require('../../config/database');

module.exports = {
  createUser: ({ name, email, registration_no, google_token }) => {
    registration_no = registration_no.toUpperCase(); // converting the roll to uppercase only

    return new Promise(async (resolve, reject) => {
      let sqlSearch = 'SELECT * FROM users WHERE google_token = ?'; //  checking if the user already exists

      await pool.query(
        sqlSearch,
        [google_token],
        async (err, result, field) => {
          if (!google_token) {
            return reject({
              status: 422,
              error: 'Token can not be undefined',
            });
          }

          if (err) {
            return reject({
              status: 500,
              error: err,
            });
          }

          if (result.length === 0) {
            let sqlInsert =
              'INSERT INTO users (name, email, registration_no, google_token) VALUES (?,?,?,?)';
            await pool.query(
              sqlInsert,
              [name, email, registration_no, google_token],
              (error, results, fields) => {
                if (error) {
                  return reject({
                    status: 500,
                    error: 'Insertion to database failed',
                  });
                }

                return resolve(results);
              }
            );
          } else {
            return resolve(result);
          }
        }
      );
    });
  },
};
