const pool = require('../../config/database');

module.exports = {
  notTurnedInTodo: ({ reg_id }) => {
    return new Promise(async (resolve, reject) => {
      let sql =
        'SELECT class_works.title, class_works.description, class_works.type, class_works.created_date, class_works.due_date, classroom.class_name, classroom.prof_id FROM class_works, classroom, users, classes WHERE class_works.due_date > current_timestamp() AND class_works.class_code = classroom.class_code AND classroom.class_code = classes.class_code AND classes.user_id = users.user_id AND users.registration_no = ?';

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
  missingTodo: ({ reg_id }) => {
    return new Promise(async (resolve, reject) => {
      let sql =
        'SELECT class_works.title, class_works.description, class_works.type, class_works.created_date, class_works.due_date, classroom.class_name, classroom.prof_id FROM class_works, classroom, users, classes WHERE class_works.due_date < current_timestamp() AND class_works.class_code = classroom.class_code AND classroom.class_code = classes.class_code AND classes.user_id = users.user_id AND users.registration_no = ?';

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
  turnedInTodo: ({ reg_id }) => {
    return new Promise(async (resolve, reject) => {
      let sql =
        'SELECT work_submission.work, work_submission.attachment, work_submission.submitted_on FROM work_submission, users WHERE work_submission.user_id = users.user_id AND users.registration_no = ?';

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
