const pool = require('../../config/database');

module.exports = {
  createUser: async (data, callback) => {
    let sqlSearch = 'SELECT * FROM users WHERE google_token = ?'; //  checking if the user already exists

    await pool.query(
      sqlSearch,
      [data.google_token],
      async (err, result, field) => {
        if (result.length === 0) {
          let sqlInsert =
            'INSERT INTO users (name, email, google_token) VALUES (?,?,?)';
          await pool.query(
            sqlInsert,
            [data.name, data.email, data.google_token],
            (error, results, fields) => {
              if (error) {
                return callback(error);
              }

              return callback(null, results);
            }
          );
        } else {
          return callback(null, result);
        }
      }
    );
  },
};
