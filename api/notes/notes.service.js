const pool = require('../../config/database');

module.exports = {
    getNotes: ({ id }) => {
        return new Promise(async (resolve, reject) => {
            let sql = `SELECT * from notes WHERE notes_id = ?`;
            await pool.query(sql, [id], (err, result, field) => {
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

    updateNotes: ({ class_code, attachment_id, posted_on }, {id}) => {
        return new Promise(async (resolve, reject) => {
            let sql = `UPDATE notes SET class_code = ?, attachment_id = ?, posted_on = ? WHERE notes_id = ?`;
            await pool.query(
                sql, [class_code, attachment_id, posted_on, id], (err, result, field) => {
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

    deleteNotes: ({ id }) => {
        return new Promise(async (resolve, reject) => {
            let sql = `DELETE FROM notes WHERE notes_id = ?`;
            await pool.query(sql, [id], (err, result, field) => {
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

    createNotes: ({ class_code, attachment_id, posted_on }) => {
        return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO notes (class_code, attachment_id, posted_on) VALUES (?,?,?)`;
            await pool.query(
                sql, [class_code, attachment_id, posted_on], (err, result, field) => {
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