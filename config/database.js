const { createPool } = require('mysql');

const pool = createPool({
	port: process.env.DB_PORT,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.MYSQL_DB,
	connectionLimit: 10,
});

pool.getConnection((err, connection) => {
	if (err) {
		throw err;
	} else {
		console.log('MySQL connected...');
	}
	connection.release();
	return;
});

module.exports = pool;
