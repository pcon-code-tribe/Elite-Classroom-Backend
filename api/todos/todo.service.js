const pool = require('../../config/database');

module.exports = {
	notTurnedInTodo: ({ google_token }) => {
		return new Promise(async (resolve, reject) => {
			let sql =
				'SELECT class_works.*, classroom.class_name, users.google_token as owner_id, users.name as owner_name FROM class_works JOIN classroom ON (class_works.class_code = classroom.class_code) JOIN users ON (users.user_id = classroom.owner_id) WHERE class_works.class_code IN (SELECT classes.class_code FROM classes WHERE user_id IN (SELECT users.user_id FROM users WHERE google_token = ?)) AND class_works.due_date >= current_timestamp() AND class_works.type = 0';

			await pool.query(sql, [google_token], (error, result, field) => {
				if (error) {
					return reject({
						status: 500,
						error,
					});
				}

				return resolve(result);
			});
		});
	},

	missingTodo: ({ google_token }) => {
		return new Promise(async (resolve, reject) => {
			let sql =
				'SELECT class_works.*, (SELECT users.name FROM users WHERE classroom.owner_id = users.user_id) as owner_name,(SELECT users.google_token FROM users WHERE classroom.owner_id = users.user_id) as owner_id, classroom.class_name FROM class_works JOIN classroom ON (classroom.class_code = class_works.class_code) JOIN classes ON (classes.class_code = class_works.class_code) JOIN users ON (users.user_id = classes.user_id) AND users.google_token = ? AND class_works.type = 0 AND class_works.due_date < current_timestamp()';

			await pool.query(sql, [google_token], (error, result, field) => {
				if (error) {
					return reject({
						status: 500,
						error,
					});
				}

				return resolve(result);
			});
		});
	},

	turnedInTodo: ({ google_token }) => {
		return new Promise(async (resolve, reject) => {
			let sql =
				'SELECT work_submission.work_id, work_submission.work, work_submission.submitted_on, class_works.title, class_works.description,class_works.due_date, class_works.attachment, class_works.class_code, class_works.created_date, classroom.class_name, users.google_token as owner_token FROM work_submission JOIN class_works ON (class_works.work_id = work_submission.work_id) JOIN classroom on (class_works.class_code = classroom.class_code) JOIN users ON (classroom.owner_id = users.user_id) WHERE (work_submission.user_id = (SELECT user_id FROM users WHERE google_token = ?))';

			await pool.query(sql, [google_token], (error, result, field) => {
				if (error) {
					return reject({
						status: 500,
						error,
					});
				}

				return resolve(result);
			});
		});
	},
};
