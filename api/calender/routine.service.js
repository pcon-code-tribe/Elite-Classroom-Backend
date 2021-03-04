const pool = require('../../config/database');


module.exports={

    addClass_routine: ({classCode, day, time}) => {

        return new Promise (async (resolve, reject) =>{
            
                    //inserts into main_schedule class time on the entered day of the entered class code
                    let sqlInsert = `INSERT INTO main_schedule SET class_code='${classCode}', ${day} ='${time}' `;

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

    getSchedule_routine: ({classCode}) => {

        return new Promise (async (resolve, reject) =>{

            //gets the routine calender
            let sql = `SELECT * FROM main_schedule WHERE class_code='${classCode}'`;

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
    },

    deleteClass_routine: ({classCode, day, time}) =>{
        
        return new Promise (async (resolve, reject) =>{

                //updates the class time of the entered day of the entered class code to ""
                let sqlDelete = `UPDATE main_schedule SET ${day} = "" WHERE class_code= '${classCode}' AND ${day}= '${time}' `;
                await pool.query(sqlDelete, [classCode], (err, result, field) =>{

                    if(err){
                        return reject({
                            status: 500,
                            error: err
                        });
                    }

                    return resolve(result);
                });
    
        })
    },

    updateClass_routine: ({classCode, day, old_time, new_time}) => {

        return new Promise (async (resolve, reject) =>{

                    //updates the old class time of the entered day of the entered class code to the new class time
                    let sqlInsert = `UPDATE main_schedule SET ${day} = '${new_time}' WHERE class_code= '${classCode}' AND ${day} = '${old_time}' `;

                    await pool.query(sqlInsert, (err, result, field) =>{

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
};