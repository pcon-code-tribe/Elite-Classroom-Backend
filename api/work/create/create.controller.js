const {submitWork}= require("./create.services");
const {uploadWork}= require('../work.services');

module.exports = {
    submit: async (req, res) =>{
        var data = req.body;
        if(!(data.user_id || data.work_id || data.work || data.attachment || data.submitted_on)){
            res.status(400).send("data missing");
        }else{
            submitWork(data,(err,info)=>{
                if(err){
                    res.status(500).json(err);
                }else{
                    res.status(200).json(info);
                }
            });
        }
    },
    upload: async (req, res)=>{
        const file = req.file;
        if(file != null){
            uploadWork(file,(err,info) =>{
                if(err){
                    console.log(err);
                    res.status(500).send("unable to upload file!");
                }else{
                    if(info != null){
                        res.json(info);
                    }else{
                        res.status(500).send("can not fetch upload data");
                    }
                }
            })
        }else{
            res.status(400).send("no attachment found");
        }
    }
};