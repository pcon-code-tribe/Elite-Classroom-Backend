const pool = require('../../config/database');

module.exports = {
    getClasswork: ({ class_code }) => {
        return new Promise(async(resolve, reject) => {
            let sql = `SELECT * from class_works WHERE class_code = ?`;
            await pool.query(sql, [class_code], (err, result, field) => {
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

    updatework: ({ title, description, type, attachment, due_date }, { work_id }) => {
        return new Promise(async(resolve, reject) => {
            let sql = `UPDATE class_works SET title=?,description=?, type=?, attachment= ?, due_date = ? WHERE work_id = ?`;
            await pool.query(
                sql, [title, description, type, attachment, due_date, work_id], (err, result, field) => {
                    if (err) {
                        return reject({
                            status: 500,
                            error: err,
                        });
                    }
                    if (result.length === 0) {
                        return reject({
                            status: 400,
                            error: 'no such work exist',
                        });
                    }
                    return resolve(result);
                });
        });
    },

    deletework: ({ work_id }) => {
        return new Promise(async(resolve, reject) => {
            let sql = `DELETE FROM class_works WHERE work_id = ?`;
            await pool.query(sql, [work_id], (err, result, field) => {
                if (err) {
                    return reject({
                        status: 500,
                        error: err,
                    });
                }
                if (result.length === 0) {
                    return reject({
                        status: 400,
                        error: 'no such notes exist',
                    });
                }
                return resolve(result);
            });
        });
    },

    creatework: ({ class_code, title, description, type, attachment, due_date }) => {
        return new Promise(async(resolve, reject) => {
            let sql = `INSERT INTO class_works(class_code,title,description,type,attachment, due_date) VALUES (?,?,?,?,?, ?)`;

            await pool.query(
                sql, [class_code, title, description, type, attachment, due_date], (err, result, field) => {
                    if (err) {
                        return reject({
                            status: 500,
                            error: err,
                        });
                    }
                    return resolve(result);
                });
        });
    }

};