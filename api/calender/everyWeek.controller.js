const { addClass_everyWeek, getSchedule_everyWeek, deleteClass_everyWeek, updateClass_everyWeek } = require('./everyWeek.service');


module.exports = {

    scheduleClass_everyWeek: (req, res) =>{

        addClass_everyWeek(req.body).then((result) =>{

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

    getCalender_everyWeek:(req, res) =>{

        getSchedule_everyWeek(req.body).then((result) => {

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

    cancelClass_everyWeek:(req, res) =>{

        deleteClass_everyWeek(req.body).then((result) =>{
            

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

    rescheduleClass_everyWeek:(req, res) =>{

        updateClass_everyWeek(req.body).then((result) =>{
            

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