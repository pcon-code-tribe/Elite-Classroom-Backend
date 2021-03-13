const {checkUser,checkWork} = require('../work.services');
const {update} = require('./update.sercives');
const {uploadWork} = require('../work.services.v2');

module.exports = {
    update: async (req, res) =>{
        const file = req.file;
        // console.log(file);
        if(file != null){
            uploadWork(file,(err,info) =>{
                if(err){
                    console.log(err);
                    res.status(500).send(err);
                }else{
                    if (info != null){
                        //upload data available
                        //update table
                        const url = info.Location;
                        var d = new Date;
                        var dformat = [d.getFullYear(),d.getMonth()+1,d.getDate(),].join('-')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
                        var uid = req.params.uid;
                        var wid = req.params.wid;
                        var sid = req.params.sid;
                        checkUser(uid,(err,info)=>{
                            if(err){
                                console.log(err);
                                res.status(500).json(err);
                            }else{
                                if(info.length == 0){
                                    res.status(401).send("invalid user");
                                }else{
                                    //user exixts
                                    //check if work exixts
                                    checkWork(wid,(err,info)=>{
                                        if(err){
                                            console.log(err);
                                            res.status(500).send(err);
                                        }else{
                                            if(info.length == 0){
                                                res.status(400).send("no such work");
                                            }else{
                                                //work exixts
                                                //go for updates
                                                const package = {
                                                    submission_id:sid,
                                                    attachment:url,
                                                    submitted_on:dformat
                                                };
                                                update(package,(err,info)=>{
                                                    if(err){
                                                        console.log(err);
                                                        res.status(500).send(err);
                                                    }else{
                                                        //updated
                                                        res.json(info);
                                                    }
                                                });
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }else{
                        res.status(500).send("can't fetch upload data");
                    }
                }
            });
        }else{
            res.status(400).send("no attachment to upload")
        }

    },
}