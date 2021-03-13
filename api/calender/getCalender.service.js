const pool = require('../../config/database');

//code to calculte the current week number
let now = new Date();
let start = new Date(now.getFullYear(), 0, 0);
let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
let oneDay = 1000 * 60 * 60 * 24;
let day = Math.floor(diff / oneDay);
let this_week = Math.ceil(day / 7);
//calculates the next week number
let next_week = this_week + 1;
//calculates the last week number
let last_week = this_week - 1;



module.exports={

    //gets the calender of last week using the google token of the user
    getSchedule_lastWeek: ({google_token}) => {

        return new Promise (async (resolve, reject) =>{

            //fetches last week's current as well as the routine calender of all the classes a user having the entered google_token is enrolled into
            let sql = `SELECT * FROM current_schedule INNER JOIN classes ON 
            current_schedule.class_code = classes.class_code
            INNER JOIN users ON classes.user_id = users.user_id
            WHERE users.google_token = '${google_token}' AND week_no = '${last_week}'
            UNION
            SELECT * FROM main_schedule INNER JOIN classes ON 
            main_schedule.class_code = classes.class_code
            INNER JOIN users ON classes.user_id = users.user_id
            WHERE users.google_token = '${google_token}'`;

            await pool.query(sql, (err, result, field) =>{
                //console.log(this_week);
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

                return resolve(result);
            });
        });
    },

    //gets the calender of this week using the google token of the user
    getSchedule_thisWeek: ({google_token}) => {

        return new Promise (async (resolve, reject) =>{

            //fetches this week's current as well as the routine calender of all the classes a user having the entered google_token is enrolled into
            let sql = `SELECT * FROM current_schedule INNER JOIN classes ON 
            current_schedule.class_code = classes.class_code
            INNER JOIN users ON classes.user_id = users.user_id
            WHERE users.google_token = '${google_token}' AND week_no = '${this_week}'
            UNION
            SELECT * FROM main_schedule INNER JOIN classes ON 
            main_schedule.class_code = classes.class_code
            INNER JOIN users ON classes.user_id = users.user_id
            WHERE users.google_token = '${google_token}'`;

            await pool.query(sql, (err, result, field) =>{
                //console.log(this_week);
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

                return resolve(result);
            });
        });
    },

    //gets the calender of next week using the google token of the user
    getSchedule_nextWeek: ({google_token}) => {

        return new Promise (async (resolve, reject) =>{

            //fetches next week's current as well as the routine calender of all the classes a user having the entered google_token is enrolled into
            let sql = `SELECT * FROM current_schedule INNER JOIN classes ON 
            current_schedule.class_code = classes.class_code
            INNER JOIN users ON classes.user_id = users.user_id
            WHERE users.google_token = '${google_token}' AND week_no = '${next_week}'
            UNION
            SELECT * FROM main_schedule INNER JOIN classes ON 
            main_schedule.class_code = classes.class_code
            INNER JOIN users ON classes.user_id = users.user_id
            WHERE users.google_token = '${google_token}'`;

            await pool.query(sql, (err, result, field) =>{

                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

                return resolve(result);
            });
        });
    }
};
