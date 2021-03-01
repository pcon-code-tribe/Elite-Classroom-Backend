const { addClass_routine, getSchedule_routine, deleteClass_routine, updateClass_routine } = require('./routine.service');


module.exports = {

    scheduleClass_routine: (req, res) =>{

        addClass_routine(req.body).then((result) =>{

            if(!result){

                res.status=500;
                res.json({
                    success: 0,
                    message: "Error in scheduling extra class"
                });
            }

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

        getSchedule_routine(req.params).then((result) => {

            if(!result){
                res.status=500;
                res.json({
                    success:0,
                    message: "Error in fetching Calender"
                });
            }

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

        deleteClass_routine(req.body).then((result) =>{
            

            if(!result){
                res.status=500;
                res.json({
                    success: 0,
                    message: "Error in cancelling class"
                });
            }
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

        updateClass_routine(req.body).then((result) =>{
            

            if(!result){
                res.status=500;
                res.json({
                    success: 0,
                    message: "Error in rescheduling class"
                });
            }
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