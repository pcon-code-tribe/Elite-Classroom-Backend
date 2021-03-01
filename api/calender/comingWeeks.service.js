const pool = require('../../config/database');

let days = ['sun','mon','tue','wed','thu','fri','sat'];

function getWeekNum(dt) {
    let d = new Date(dt);
    let start = new Date(d.getFullYear(), 0, 0);
    let diff = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    let week = Math.ceil(day / 7);

    return week;
}

function getWeekDay(dt) {
    let d = new Date(dt);
    let week_day = days[ d.getDay() ];

    return week_day;
}


module.exports={

    addClass: ({classCode, date, time}) => {

        let week = getWeekNum(date);
        let week_day = getWeekDay(date);

        return new Promise (async (resolve, reject) =>{

            let sqlInsert = `INSERT INTO current_schedule SET class_code= '${classCode}', week_no= '${week}', ${week_day} = '${time}'`;

                await pool.query(sqlInsert, (err, result, field) =>{

                    if(err){
                        return reject({
                            status: 500,
                            error: err
                        });
                    }
                        //console.log(result);
                        return resolve(result);
                });
            });
        },

    deleteClass: ({classCode, date, time}) =>{

        let week = getWeekNum(date);
        let week_day = getWeekDay(date);
        
        return new Promise (async (resolve, reject) =>{

            let sqlDelete = `DELETE FROM current_schedule WHERE class_code= '${classCode}' AND week_no= '${week}' AND ${week_day} = '${time}'  `;
            await pool.query(sqlDelete, (err, result, field) =>{

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

    updateClass: ({classCode, date, old_time, new_time}) => {

        let week = getWeekNum(date);
        let week_day = getWeekDay(date);
    
        return new Promise (async (resolve, reject) =>{
           
                let sqlUpdate = `UPDATE current_schedule SET ${week_day}= '${new_time}' WHERE class_code= '${classCode}' AND week_no= '${week}' AND ${week_day}= '${old_time}'`;

                await pool.query(sqlUpdate, (err, result, field) =>{

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