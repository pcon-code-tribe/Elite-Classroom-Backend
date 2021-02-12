const pool = require('../../config/database');

module.exports = {
  //get a particular note via given notes_id
  getNotesId: ({ id }) => {
    return new Promise(async (resolve, reject) => {
      let sql = `SELECT * from notes WHERE notes_id = ?`;
      await pool.query(sql, [id], (error, result, field) => {
        if (error) {
          return reject({
            status: 500,
            error,
          });
        }
        if (result.length === 0) {
          return reject({
            status: 400,
            error: 'No such note exists',
          });
        }
        return resolve(result);
      });
    });
  },

  //get all notes via class_code
  getNotesCode: ({ class_code }) => {
    return new Promise(async (resolve, reject) => {
      let sql = `SELECT * from notes WHERE class_code = ?`;
      await pool.query(sql, [class_code], (error, result, field) => {
        if (error) {
          return reject({
            status: 500,
            error,
          });
        }
        if (result.length === 0) {
          return reject({
            status: 400,
            error: 'No such notes exist',
          });
        }
        return resolve(result);
      });
    });
  },

  //update a particular note via given notes_id
  updateNotes: ({ id }, { attachment_id, google_token }) => {
    return new Promise(async (resolve, reject) => {
      //  checking if notes is being updated by the owner
      let checkSql =
        'SELECT user_id FROM users, notes, classroom WHERE notes.class_code = classroom.class_code AND users.user_id = classroom.owner_id AND google_token = ?';

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
              status: 401,
              error,
              message: 'Only owner of the classroom can update the note',
            });
          }

          let sql = `UPDATE notes SET attachment_id = ? WHERE notes_id = ?`;

          await pool.query(sql, [attachment_id, id], (error, result, field) => {
            if (error) {
              return reject({
                status: 400,
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

  //delete a particular note via given notes_id
  deleteNotes: ({ id }, { google_token }) => {
    return new Promise(async (resolve, reject) => {
      //  checking if notes is being deleted by the owner
      let checkSql =
        'SELECT user_id FROM users, notes, classroom WHERE notes.class_code = classroom.class_code AND users.user_id = classroom.owner_id AND google_token = ?';

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
              status: 401,
              error,
              message: 'Only owner of the classroom can delete the note',
            });
          }

          let sql = `DELETE FROM notes WHERE notes_id = ?`;
          await pool.query(sql, [id], (error, result, field) => {
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

  // create a note in a particular class via its class_code
  createNotes: ({ class_code }, { attachment_id, google_token }) => {
    return new Promise(async (resolve, reject) => {
      //  checking if notes is being created by the owner
      let checkSql =
        'SELECT user_id FROM users, classroom WHERE classroom.class_code = ? AND users.user_id = classroom.owner_id AND google_token = ?';

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
              message: 'Only owner of the classroom can create the note',
            });
          }

          let sql = `INSERT INTO notes (attachment_id, posted_on, class_code) VALUES (?, current_timestamp(), ?)`;
          await pool.query(
            sql,
            [attachment_id, class_code],
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
