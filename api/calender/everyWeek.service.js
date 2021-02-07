const pool = require('../../config/database');


module.exports={

    addClass_everyWeek: ({classCode, day, time}) => {

        return new Promise (async (resolve, reject) =>{
            
            let sqlSearch = `SELECT ${day} FROM main_schedule WHERE class_code= ${classCode}`;
            await pool.query(sqlSearch, async(err, result, field) =>{
            
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

                if(result.length === 0){
           
                    let sqlInsert = `INSERT INTO main_schedule SET class_code=?, ${day} =? `;

                    await pool.query(sqlInsert, [classCode, time], (err, result, field) =>{

                        if(err){
                            return reject({
                                status: 500,
                                error: err
                            });
                        }
                        //console.log(result);
                        return resolve(result);
                    });
                }
                else{
                    let sqlUpdate = `UPDATE main_schedule SET ${day} =? WHERE class_code=? `;

                    await pool.query(sqlUpdate, [time, classCode], (err, result, field) =>{

                        if(err){
                            return reject({
                                status: 500,
                                error: err
                            });
                        }
                        //console.log(result);
                        return resolve(result);
                    });
                }
            });
        });
    },

    getSchedule_everyWeek: ({classCode}) => {

        return new Promise (async (resolve, reject) =>{

            let sql = 'SELECT * FROM main_schedule WHERE class_code=?';

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

    deleteClass_everyWeek: ({classCode, day, time}) =>{
        
        return new Promise (async (resolve, reject) =>{

            let sqlSearch = `SELECT ${day} FROM main_schedule WHERE class_code=?`;
            await pool.query(sqlSearch, [classCode], async(err, result, field) =>{
            
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

            if(result){

                let sqlDelete = `UPDATE main_schedule SET ${day} = NULL WHERE class_code=? `;
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

    updateClass_everyWeek: ({classCode, day, time}) => {

        return new Promise (async (resolve, reject) =>{

            let sqlSearch = `SELECT ${day} FROM main_schedule WHERE class_code=?`;
            await pool.query(sqlSearch, [classCode], async(err, result, field) =>{
            
                if(err){
                    return reject({
                        status: 500,
                        error: err
                    });
                }

                if(result){
           
                    let sqlInsert = `UPDATE main_schedule SET ${day} =? WHERE class_code=?`;

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