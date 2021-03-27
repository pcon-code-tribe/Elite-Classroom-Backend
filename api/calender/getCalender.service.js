const pool = require('../../config/database');

//function to calculate the week number of the date passed as an argument
function getWeekNum() {
    let d = new Date();
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



module.exports={

    //gets the calender of last week using the google token of the user
    getSchedule_lastWeek: ({google_token}) => {

        return new Promise (async (resolve, reject) =>{

            let last_week = getWeekNum() - 1;

            //fetches last week's current as well as the routine calender of all the classes a user having the entered google_token is enrolled into
            let sql = `SELECT cs.week_no, cs.sun, cs.mon, cs.tue, cs.wed, cs.thu, cs.fri, cs.sat, cs.class_code, cs.description, cs.class_link, cm.class_name, cm.owner_id, u.profile_pic FROM current_schedule cs INNER JOIN classes c ON 
            cs.class_code = c.class_code
            INNER JOIN users u ON c.user_id = u.user_id
            INNER JOIN classroom cm ON cs.class_code = cm.class_code
            WHERE u.google_token = '${google_token}' AND cs.week_no = '${last_week}'
            UNION
            SELECT ms.schedule_id, ms.sun, ms.mon, ms.tue, ms.wed, ms.thu, ms.fri, ms.sat, ms.class_code, cm.description, cm.class_link, cm.class_name, cm.owner_id, u.profile_pic
            FROM main_schedule ms INNER JOIN classes c ON 
            ms.class_code = c.class_code
            INNER JOIN users u ON c.user_id = u.user_id
            INNER JOIN classroom cm ON ms.class_code = cm.class_code
            WHERE u.google_token = '${google_token}'`;

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

            let this_week = getWeekNum();

            //fetches this week's current as well as the routine calender of all the classes a user having the entered google_token is enrolled into
            let sql = `SELECT cs.week_no, cs.sun, cs.mon, cs.tue, cs.wed, cs.thu, cs.fri, cs.sat, cs.class_code, cs.description, cs.class_link, cm.class_name, cm.owner_id, u.profile_pic FROM current_schedule cs INNER JOIN classes c ON 
            cs.class_code = c.class_code
            INNER JOIN users u ON c.user_id = u.user_id
            INNER JOIN classroom cm ON cs.class_code = cm.class_code
            WHERE u.google_token = '${google_token}' AND cs.week_no = '${this_week}'
            UNION
            SELECT ms.schedule_id, ms.sun, ms.mon, ms.tue, ms.wed, ms.thu, ms.fri, ms.sat, ms.class_code, cm.description, cm.class_link, cm.class_name, cm.owner_id, u.profile_pic
            FROM main_schedule ms INNER JOIN classes c ON 
            ms.class_code = c.class_code
            INNER JOIN users u ON c.user_id = u.user_id
            INNER JOIN classroom cm ON ms.class_code = cm.class_code
            WHERE u.google_token = '${google_token}'`;

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

            let next_week = getWeekNum() + 1;

            //fetches next week's current as well as the routine calender of all the classes a user having the entered google_token is enrolled into
            let sql = `SELECT cs.week_no, cs.sun, cs.mon, cs.tue, cs.wed, cs.thu, cs.fri, cs.sat, cs.class_code, cs.description, cs.class_link, cm.class_name, cm.owner_id, u.profile_pic FROM current_schedule cs INNER JOIN classes c ON 
            cs.class_code = c.class_code
            INNER JOIN users u ON c.user_id = u.user_id
            INNER JOIN classroom cm ON cs.class_code = cm.class_code
            WHERE u.google_token = '${google_token}' AND cs.week_no = '${next_week}'
            UNION
            SELECT ms.schedule_id, ms.sun, ms.mon, ms.tue, ms.wed, ms.thu, ms.fri, ms.sat, ms.class_code, cm.description, cm.class_link, cm.class_name, cm.owner_id, u.profile_pic
            FROM main_schedule ms INNER JOIN classes c ON 
            ms.class_code = c.class_code
            INNER JOIN users u ON c.user_id = u.user_id
            INNER JOIN classroom cm ON ms.class_code = cm.class_code
            WHERE u.google_token = '${google_token}'`;

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
