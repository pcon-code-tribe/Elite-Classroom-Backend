const { addClass_thisWeek, getSchedule_thisWeek, deleteClass_thisWeek, updateClass_thisWeek } = require('./thisWeek.service');


module.exports = {

    scheduleClass_thisWeek: (req, res) =>{

        addClass_thisWeek(req.body).then((result) =>{

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

    getCalender_thisWeek:(req, res) =>{

        getSchedule_thisWeek(req.body).then((result) => {

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

    cancelClass_thisWeek:(req, res) =>{

        deleteClass_thisWeek(req.body).then((result) =>{
            

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

    rescheduleClass_thisWeek:(req, res) =>{

        updateClass_thisWeek(req.body).then((result) =>{
            

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