const {submitWork,uploadWork}= require("./create.services");

module.exports = {
    submit: async (req, res) =>{
        var data = req.body;
        if(!(data.user_id || data.work_id || data.work || data.attachment || data.submitted_on)){
            res.status(400).send("data missing");
        }else{
            res.send("all good");
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