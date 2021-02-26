const pool = require('../../config/database');

module.exports = {
	createUser: ({ name, email, profile_pic, google_token }) => {
		return new Promise(async (resolve, reject) => {
			let sqlSearch = 'SELECT * FROM users WHERE google_token = ?'; //  checking if the user already exists

			await pool.query(
				sqlSearch,
				[google_token],
				async (error, result, field) => {
					if (!google_token) {
						return reject({
							status: 422,
							error: 'Token can not be undefined',
						});
					}

					if (error) {
						return reject({
							status: 500,
							error,
						});
					}

					if (result.length === 0) {
						let sqlInsert =
							'INSERT INTO users (name, email, profile_pic, google_token) VALUES (?,?,?,?)';
						await pool.query(
							sqlInsert,
							[name, email, profile_pic, google_token],
							(error, results, fields) => {
								if (error) {
									return reject({
										status: 500,
										message: 'Insertion to database failed',
										error,
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
