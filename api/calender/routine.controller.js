const { addClass_routine, getSchedule_routine, deleteClass_routine, updateClass_routine } = require('./routine.service');


module.exports = {

    scheduleClass_routine: (req, res) =>{

        //takes class code, day and time of class from req.body
        addClass_routine(req.body).then((result) =>{

            if(!result){
                //if an error occured send the error message
                res.status=500;
                res.json({
                    success: 0,
                    message: "Error in scheduling extra class"
                });
            }
                //else send the success message
                res.status=200;
                res.json({
                    success: 1,
                    message: "Class scheduled!"
                });
        })
        .catch((e) =>{
            res.status(e.status);
            res.send(e);
            res.end()
        });
    },

    getCalender_routine:(req, res) =>{

        //takes class code from req.body
        getSchedule_routine(req.params).then((result) => {

            //if an error occured send the error message
            if(!result){
                res.status=500;
                res.json({
                    success:0,
                    message: "Error in fetching Calender"
                });
            }
            //else send the result
            res.status=200;
            res.send(result);
        })
        .catch((e) =>{
            res.status(e.status);
            res.send(e);
            res.end();
        });
    },

    cancelClass_routine:(req, res) =>{

        //takes class code, day and time of class from req.body
        deleteClass_routine(req.body).then((result) =>{
            
            //if an error occured send the error message
            if(!result){
                res.status=500;
                res.json({
                    success: 0,
                    message: "Error in cancelling class"
                });
            }
            //else send the success message
            res.status=200;
            res.json({
                success: 1,
                message: "Class Cancelled!"
            });
        })
        .catch((e) =>{
            res.status(e.status);
            res.send(e);
            res.end();
        });
    },

    rescheduleClass_routine:(req, res) =>{

        //takes class code, day, old time and new time of class from req.body
        updateClass_routine(req.body).then((result) =>{
            
            //if an error occured send the error message
            if(!result){
                res.status=500;
                res.json({
                    success: 0,
                    message: "Error in rescheduling class"
                });
            }
            //else send the success message
            res.status=200;
            res.json({
                success: 1,
                message: "Class Rescheduled!"
            });
        })
        .catch((e) =>{
            res.status(e.status);
            res.send(e);
            res.end();
        });
    }
};