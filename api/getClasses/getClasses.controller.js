const { getClass } = require('./getClasses.service');

module.exports = {

    classes: (req, res) =>{

        getClass(req.body).then((result) =>{

            if(!result){

                res.status(500);
                return res.json({
                    success: 0,
                    message: "Error occured in fetching classes"
                });
            }

            res.status(200);
            return res.send(result);
        })

        .catch((e) =>{
            res.status(e.status);
            res.send(e);
            res.end();
        });
    },
};