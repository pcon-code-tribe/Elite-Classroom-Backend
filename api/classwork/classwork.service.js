const pool = require('../../config/database');

module.exports = {
  getClasswork: ({ class_code }) => {
    return new Promise(async (resolve, reject) => {
      let sql = `SELECT class_works.work_id, class_works.class_code, class_works.title, class_works.description, class_works.type, class_works.attachment, class_works.created_date, class_works.due_date, class_works.points, users.google_token as owner_token FROM class_works JOIN classroom ON (class_works.class_code = classroom.class_code) JOIN users ON (users.user_id = classroom.owner_id) WHERE class_works.class_code = ?`;

      await pool.query(
        sql,
        [class_code, class_code],
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
    });
  },

  updateClasswork: (
    { work_id },
    { title, description, type, attachment, due_date, points, google_token }
  ) => {
    return new Promise(async (resolve, reject) => {
      //  checking if classwork is being updated by the owner
      let checkSql =
        'SELECT user_id FROM users JOIN classroom ON (users.user_id = classroom.owner_id) AND google_token = ?';

      await pool.query(
        checkSql,
        [google_token],
        async (error, result, field) => {
          if (error) {
            return reject({
              status: 500,
              error,
            });
          }

          if (result.length === 0) {
            return reject({
              status: 500,
              error,
              message: 'Only owner can update the classwork',
            });
          }

          let sql = `UPDATE class_works SET title = ?, description = ?, type = ?, attachment = ?, due_date = ?, points = ? WHERE work_id = ?`;
          await pool.query(
            sql,
            [title, description, type, attachment, due_date, points, work_id],
            (error, result, field) => {
              if (error) {
                return reject({
                  status: 500,
                  error,
                });
              }
              if (result.affectedRows === 0) {
                return reject({
                  status: 400,
                  error: 'No such note exists',
                });
              }
              return resolve(result);
            }
          );
        }
      );
    });
  },

  deleteClasswork: ({ work_id }, { google_token }) => {
    return new Promise(async (resolve, reject) => {
      //  checking if classwork is being deleted by the owner
      let checkSql =
        'SELECT user_id FROM users JOIN classroom ON (users.user_id = classroom.owner_id) AND google_token = ?';

      await pool.query(
        checkSql,
        [google_token],
        async (error, result, field) => {
          if (error) {
            return reject({
              status: 500,
              error,
            });
          }

          if (result.length === 0) {
            return reject({
              status: 500,
              error,
              message: 'Only owner can delete the classwork',
            });
          }

          let sql = `DELETE FROM class_works WHERE work_id = ?`;
          await pool.query(sql, [work_id], (error, result, field) => {
            if (error) {
              return reject({
                status: 500,
                error,
              });
            }
            if (result.affectedRows === 0) {
              return reject({
                status: 400,
                error: 'No such note exists',
              });
            }
            return resolve(result);
          });
        }
      );
    });
  },

  createClasswork: ({
    class_code,
    title,
    description,
    type,
    attachment,
    due_date,
    points,
    google_token,
  }) => {
    return new Promise(async (resolve, reject) => {
      //  checking if classwork is being created by the owner
      let checkSql =
        'SELECT user_id FROM users JOIN classroom ON (users.user_id = classroom.owner_id AND classroom.class_code = ?) AND google_token = ?';

      await pool.query(
        checkSql,
        [class_code, google_token],
        async (error, result, field) => {
          if (error) {
            return reject({
              status: 500,
              error,
            });
          }

          if (result.length === 0) {
            return reject({
              status: 500,
              error,
              message: 'Only owner can make a classwork',
            });
          }

          let sql = `INSERT INTO class_works (class_code, title, description, type, attachment, points, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;

          await pool.query(
            sql,
            [
              class_code,
              title,
              description,
              type,
              attachment,
              points,
              due_date,
            ],
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
};
