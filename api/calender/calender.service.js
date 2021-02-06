const pool = require('../../config/database');


let weekday = new Array(7);
weekday[0] = "sun";
weekday[1] = "mon";
weekday[2] = "tue";
weekday[3] = "wed";
weekday[4] = "thu";
weekday[5] = "fri";
weekday[6] = "sat";

module.exports={

    addClass: ({classCode, date, time}) => {

        return new Promise (async (resolve, reject) =>{

            let classDay = new Date(date).getDay();
            let n = weekday[classDay];

            let sqlSearch = `SELECT ${n} FROM current_schedule WHERE class_code=?`;
            await pool.query(sqlSearch, [classCode], async(err, result, field) =>{
            
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

                if(result.length === 0){
           
                    let sqlInsert = `INSERT INTO current_schedule SET class_code=?, ${n} =? `;

                    await pool.query(sqlInsert, [classCode, time], (err, result, field) =>{

                        if(err){
                            return reject({
                                status: 500,
                                error: err
                            });
                        }

                        return resolve(result);
                    });
                }
                return resolve(result);
            });
        });
    },

    getSchedule: ({classCode}) => {

        return new Promise (async (resolve, reject) =>{

            let sql = 'SELECT * FROM current_schedule WHERE class_code=?';

            await pool.query(sql, [classCode], (err, result, field) =>{

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

    deleteClass: ({classCode, date, time}) =>{
        
        return new Promise (async (resolve, reject) =>{

            let classDay = new Date(date).getDay();
            let n = weekday[classDay];

            let sqlSearch = `SELECT ${n} FROM current_schedule WHERE class_code=?`;
            await pool.query(sqlSearch, [classCode], async(err, result, field) =>{
            
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

            if(result){

                let sqlDelete = `DELETE FROM current_schedule WHERE class_code=?, ${n} =? `;
                await pool.query(sqlDelete, [classCode, time], (err, result, field) =>{

                    if(err){
                        return reject({
                            status: 500,
                            error: err
                        });
                    }

                    return resolve(result);
                });
            }
            return resolve(result);
        });
    })
    },

    updateClass: ({classCode, date, time}) => {

        return new Promise (async (resolve, reject) =>{

            let classDay = new Date(date).getDay();
            let n = weekday[classDay];

            let sqlSearch = `SELECT ${n} FROM current_schedule WHERE class_code=?`;
            await pool.query(sqlSearch, [classCode], async(err, result, field) =>{
            
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

                if(!result){
           
                    let sqlInsert = `UPDATE current_schedule SET ${n} =? WHERE class_code=?`;

                    await pool.query(sqlInsert, [time, classCode], (err, result, field) =>{

                        if(err){
                            return reject({
                                status: 500,
                                error: err
                            });
                        }

                        return resolve(result);
                    });
                    return resolve(result);
                }
            });
        });
    },
};