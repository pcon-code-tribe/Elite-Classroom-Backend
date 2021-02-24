const { getSchedule_lastWeek, getSchedule_thisWeek, getSchedule_nextWeek} = require('./getCalender.service');

module.exports = {

    getCalender_lastWeek:(req, res) =>{

        getSchedule_lastWeek(req.params).then((result) => {

            if(!result){
                res.status=500;
                res.json({
                    success:0,
                    message: "Error in fetching Last Week's Calender"
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

    getCalender_thisWeek:(req, res) =>{

        getSchedule_thisWeek(req.params).then((result) => {

            if(!result){
                res.status=500;
                res.json({
                    success:0,
                    message: "Error in fetching This Week's Calender"
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

    getCalender_nextWeek:(req, res) =>{

        getSchedule_nextWeek(req.params).then((result) => {

            if(!result){
                res.status=500;
                res.json({
                    success:0,
                    message: "Error in fetching Next Week's Calender"
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
    }
};