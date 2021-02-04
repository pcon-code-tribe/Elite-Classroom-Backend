const {read_from_db} = require('./services');
const {checkUser,checkWork} = require("../work.services");

module.exports = {
    submission : async (req, res) =>{
        const sql = "SELECT * FROM work_submission WHERE submission_id = ?";
        const param=[req.params.id];
        read_from_db(sql, param,(err,info) =>{
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                if(info.length == 0){
                    res.status(400).send("No such submission found");
                }else{
                    res.json(info[0]);
                }
            }
        })
    },
    work: async (req, res) =>{
        const sql = "SELECT * FROM work_submission WHERE work_id = ?";
        const id = req.params.id;
        const param=[id];
        checkWork(id,(err,info) =>{
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                if(info.length == 0){
                    res.status(400).send("No such work exist");
                }else{
                    read_from_db(sql,param,(err,info)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send(err);
                        }else{
                            res.json(info);
                        }
                    })
                }
            }
        });
    },
    user: async (req, res)=>{
        const sql = "SELECT * FROM work_submission WHERE work_id = ? AND user_id = ?";
        const param =[req.params.workid, req.params.uid];
        checkUser(req.params.uid,(err,info)=>{
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                if(info.length == 0){
                    res.status(400).send("no such error");
                }else{
                    //user exists
                    //lets check for work
                    checkWork(req.params.workid,(err,info)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send(err);
                        }else{
                            if(info.length == 0){
                                res.status(400).send("no such work");
                            }else{
                                //work exixts
                                read_from_db(sql, param,(err,info)=>{
                                    if(err){
                                        console.log(err);
                                        res.status(500).send(err);
                                    }else{
                                        res.json(info);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    },
};