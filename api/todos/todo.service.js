const pool = require('../../config/database');

module.exports = {
	notTurnedInTodo: ({ google_token }) => {
		return new Promise(async (resolve, reject) => {
			let sql =
				'SELECT class_works.title, class_works.description, class_works.type, class_works.created_date, class_works.due_date, classroom.class_name, classroom.owner_id, users.name as owner_name FROM class_works JOIN classroom ON (class_works.class_code = classroom.class_code) JOIN users ON (classroom.owner_id = users.user_id) AND class_works.due_date >= current_timestamp() AND users.google_token = ?';

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
				'SELECT class_works.title, class_works.description, class_works.type, class_works.created_date, class_works.due_date, (SELECT name FROM users WHERE classroom.owner_id = users.user_id) as owner_name, classroom.class_name FROM class_works JOIN classroom ON (classroom.class_code = class_works.class_code) JOIN classes ON (classes.class_code = class_works.class_code) JOIN users ON (users.user_id = classes.user_id) AND users.google_token = ?';

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
				'SELECT work_submission.work, work_submission.attachment, work_submission.submitted_on FROM work_submission WHERE (work_submission.user_id = (SELECT user_id FROM users WHERE google_token = ?))';

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
