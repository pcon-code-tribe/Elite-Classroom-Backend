const pool = require('../../config/database');

module.exports = {
    getNotes: ({ class_code }) => {
        return new Promise(async (resolve, reject) => {
            let sql = `SELECT * from notes WHERE class_code = ?`;
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

    updateNotes: ({ attachment_id, posted_on }, { id }) => {
        return new Promise(async (resolve, reject) => {
            let sql = `UPDATE notes SET attachment_id = ?, posted_on = ? WHERE notes_id = ?`;
            await pool.query(
                sql, [attachment_id, posted_on, id], (err, result, field) => {
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

    createNotes: ({ attachment_id, posted_on }, { class_code }) => {
        return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO notes (attachment_id, posted_on, class_code) VALUES (?,?, ?)`;
            await pool.query(
                sql, [attachment_id, posted_on, class_code], (err, result, field) => {
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