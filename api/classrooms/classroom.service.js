const { nanoid } = require('nanoid');
const pool = require('../../config/database');

module.exports = {
  createClassroom: ({ className, google_token }) => {
    return new Promise(async (resolve, reject) => {
      let classCode = nanoid(20);
      let sql =
        'INSERT INTO classroom (class_code, class_name, owner_id ) VALUES (?, ?, (SELECT user_id FROM users WHERE google_token = ?))';

      await pool.query(
        sql,
        [classCode, className, google_token],
        async (error, result, field) => {
          if (error) {
            return reject({
              status: 500,
              error,
            });
          }

          //  inserting owner into the classroom made
          let insertOwner =
            'INSERT INTO classes SET user_id = (SELECT user_id FROM users WHERE google_token = ?), class_code = ?';

          await pool.query(
            insertOwner,
            [google_token, classCode],
            (error, result, field) => {
              if (error) {
                return reject({
                  status: 500,
                  error,
                });
              }
              return resolve(result);
            }
          );
        }
      );
    });
  },

  joinClassroom: ({ classCode, google_token }) => {
    return new Promise(async (resolve, reject) => {
      let sqlFindUser = 'SELECT user_id FROM users WHERE google_token = ?'; //  checking if the user is in the database

      await pool.query(
        sqlFindUser,
        [google_token],
        async (error, result, field) => {
          if (result.length === 0) {
            return reject({
              status: 500,
              error,
              message: 'User is not registered',
            });
          }

          let sqlSearch =
            'SELECT classes.class_code FROM classes, users WHERE users.google_token = ? AND users.user_id = classes.user_id AND classes.class_code = ?'; //  checking if user already joined classroom

          await pool.query(
            sqlSearch,
            [google_token, classCode],
            async (error, result, field) => {
              if (error) {
                return reject({
                  status: 500,
                  error,
                });
              }

              if (result.length === 0) {
                let sqlInsert =
                  'INSERT INTO classes SET user_id = (SELECT user_id FROM users WHERE google_token = ?), class_code = ?';
                await pool.query(
                  sqlInsert,
                  [google_token, classCode],
                  (error, result, field) => {
                    if (error) {
                      return reject({
                        status: 500,
                        error,
                      });
                    }
                    return resolve(result);
                  }
                );
              }

              return resolve(result);
            }
          );
        }
      );
    });
  },
};
