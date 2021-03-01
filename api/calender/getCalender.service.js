const pool = require('../../config/database');

let now = new Date();
let start = new Date(now.getFullYear(), 0, 0);
let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
let oneDay = 1000 * 60 * 60 * 24;
let day = Math.floor(diff / oneDay);
let this_week = Math.ceil(day / 7);
let next_week = this_week + 1;
let last_week = this_week - 1;



module.exports={

    getSchedule_lastWeek: ({classCode}) => {

        return new Promise (async (resolve, reject) =>{

            let sql = `SELECT DISTINCT * FROM current_schedule WHERE class_code= '${classCode}' AND week_no= '${last_week}'
            UNION SELECT * FROM main_schedule WHERE class_code= '${classCode}'`;

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


    getSchedule_thisWeek: ({classCode}) => {

        return new Promise (async (resolve, reject) =>{

            let sql = `SELECT DISTINCT * FROM current_schedule WHERE class_code= '${classCode}' AND week_no= '${this_week}'
            UNION SELECT * FROM main_schedule WHERE class_code= '${classCode}'`;

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

    getSchedule_nextWeek: ({classCode}) => {

        return new Promise (async (resolve, reject) =>{

            let sql = `SELECT * FROM current_schedule WHERE class_code= '${classCode}' AND week_no= '${next_week}'
            UNION SELECT * FROM main_schedule WHERE class_code= '${classCode}'`;

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
