const pool = require('../../config/database');

/*array containing all the days of the week on the index of the week day number as returned by the js function .getDay()
which is used in the function getWeekDay() */
let days = ['sun','mon','tue','wed','thu','fri','sat'];

//function to calculate the week number of the date passed as an argument
function getWeekNum(dt) {
    let d = new Date(dt);
    let start = new Date(d.getFullYear(), 0, 0);

    //if the first day of the year is not sunday
    if(start.getDay()!=0){ 
        //change the start date to the first sunday of the year
        start = new Date(d.getFullYear(), 0, 7-start.getDay());
    }

    /*for the days coming before the start date of the year, their week number will be same as the week number of the last day of previous year */
    if(d < start){
        let last_year = d.getFullYear()-1;

        //check if last year was a leap year or not
        if(last_year % 400 == 0){
            d = new Date(last_year, 11, 366);
        }
        else if(last_year % 100 ==0){
            d = new Date(last_year, 11, 365); 
        }
        else if(last_year % 4 ==0){
            d = new Date(last_year, 11, 366); 
        }
        else{
            d = new Date(last_year, 11, 365); 
        }

        start = new Date(last_year, 0, 0);
        //if the first day of the year is not sunday
        if(start.getDay()!=0){
            //change the start date to the first sunday of last year
            start = new Date(last_year, 0, 7-start.getDay());
        }
            //calculate the difference of milliseconds from start date upto the date entered
            let diff = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
            //milliseconds in one day
            let oneDay = 1000 * 60 * 60 * 24;
            //get the number of days upto the date
            let day = Math.ceil(diff / oneDay);
            //get the week number
            let week = Math.ceil(day / 7);  
            //return the calculated week number 
            return week; 
    }

    let diff = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.ceil(diff / oneDay);
    let week = Math.ceil(day / 7);

    return week;
}
//function to calculate the week day of the date passed as an argument
function getWeekDay(dt) {
    let d = new Date(dt);
    let week_day = days[ d.getDay() ];

    return week_day;
}


module.exports={

    addClass: ({classCode, date, time}) => {

        //gets the week number of the date entered by the user
        let week = getWeekNum(date);
        //gets the week day of the date entered by the user
        let week_day = getWeekDay(date);

        return new Promise (async (resolve, reject) =>{

            //inserts the class time on the day of the date entered and the week of the date entered into the table
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

        //gets the week number of the date entered by the user
        let week = getWeekNum(date);
        //gets the week day of the date entered by the user
        let week_day = getWeekDay(date);
        
        return new Promise (async (resolve, reject) =>{

            //deletes the class time on the day of the date entered and the week of the date entered from the table
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

        //gets the week number of the date entered by the user
        let week = getWeekNum(date);
        //gets the week day of the date entered by the user
        let week_day = getWeekDay(date);
    
        return new Promise (async (resolve, reject) =>{
           
            //updates the class time from old to new on the day of the date entered and the week of the date entered into the table
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