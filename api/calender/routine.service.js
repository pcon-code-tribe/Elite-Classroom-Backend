const pool = require('../../config/database');


module.exports={

    addClass_routine: ({classCode, day, time}) => {

        return new Promise (async (resolve, reject) =>{
            
            let sqlSearch = `SELECT ${day} FROM main_schedule WHERE class_code= '${classCode}'`;
            await pool.query(sqlSearch, async(err, result, field) =>{
            
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }
           
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
                return resolve(result);
            });
        });
    },

    getSchedule_routine: ({classCode}) => {

        return new Promise (async (resolve, reject) =>{

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

            let sqlSearch = `SELECT ${day} FROM main_schedule WHERE class_code='${classCode}'`;
            await pool.query(sqlSearch, async(err, result, field) =>{
            
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

            if(result){

                let sqlDelete = `UPDATE main_schedule SET ${day} = "" WHERE class_code= '${classCode}' `;
                await pool.query(sqlDelete, [classCode], (err, result, field) =>{

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

    updateClass_routine: ({classCode, day, old_time, new_time}) => {

        return new Promise (async (resolve, reject) =>{

            let sqlSearch = `SELECT ${day} FROM main_schedule WHERE class_code= '${classCode}'`;
            await pool.query(sqlSearch, async(err, result, field) =>{
            
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

                if(result){
           
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
                    return resolve(result);
                }
            });
        });
    },
};