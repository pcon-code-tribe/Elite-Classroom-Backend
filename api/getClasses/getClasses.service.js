const pool = require('../../config/database');

module.exports = {
	getClass: ({ google_token }) => {
		return new Promise(async (resolve, reject) => {
			let sql =
				'SELECT classes.class_code, classroom.class_name, (SELECT google_token FROM users WHERE classroom.owner_id = users.user_id) as owner_id, (SELECT COUNT(user_id) FROM classes WHERE (classes.class_code = classroom.class_code)) as number_of_participants, users.name as owner_name FROM classes JOIN classroom ON (classes.class_code = classroom.class_code) JOIN users ON (classroom.owner_id = users.user_id) AND (classes.user_id = (SELECT user_id FROM users WHERE google_token = ?))';

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
