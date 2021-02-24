const {getSubmission,deleteSubmission} = require("./delete.services");
const {deleteWork} = require("../work.services.v2");

module.exports = {
    deleteSubmission: (req, res) => {
        const sid = req.params.sid;
        getSubmission(sid,(err,info)=>{
            if(err){
                res.status(500).json(err);
            }else{
                if(info.length == 0){
                    res.status(400).send("no such submission");
                }else{
                    //submission found
                    //start deletion of data
                    deleteWork(info[0].attachment,(err,info)=>{
                        if(err){
                            console.log(err);
                            res.status(500).json(err);
                        }else{
                            //s3object deleted
                            //delete from database 
                            deleteSubmission(sid,(err,info)=>{
                                if(err){
                                    res.status(500).json(err);
                                }else{
                                    res.json(info);
                                }
                            })
                        }
                    })
                }
            }
        })
    },
}