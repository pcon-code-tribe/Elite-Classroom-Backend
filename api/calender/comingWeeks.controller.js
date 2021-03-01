const { addClass, deleteClass, updateClass } = require('./comingWeeks.service');


module.exports = {

    scheduleClass: (req, res) =>{

        addClass(req.body).then((result) =>{

            if(!result){

                res.status=500;
                res.json({
                    success: 0,
                    message: "Error in scheduling extra class"
                });
            }
                console.log(result);
                //if(result.changedRows === 0)
                //{
                //    res.status=200;
                //    res.json({
                //        success: 0,
                //        message: "A class at this time already exists!"
                //    });
                //}

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

    cancelClass:(req, res) =>{

        deleteClass(req.body).then((result) =>{
            

            if(!result){
                res.status=500;
                res.json({
                    success: 0,
                    message: "Error in cancelling class"
                });
            }
            
            console.log(result);
            //if(result.changededRows === 0)
            //{
            //    res.status=200;
            //    res.json({
            //        success: 0,
            //        message: "No such class exists!"
            //    });
            //}
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

    rescheduleClass:(req, res) =>{

        updateClass(req.body).then((result) =>{
            

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