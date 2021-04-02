const pool = require('../../config/database');
module.exports = {
    submitFeedback: ({
        user_id,
        feedback_msg
    }) => {
        return new Promise(async(resolve, reject) => {

            let sql = `INSERT INTO feedbacks (google_token,msg) VALUES (?, ?)`;

            await pool.query(
                sql, [
                    user_id, feedback_msg
                ],
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
        });
    },
};