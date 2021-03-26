const {uploadWork,downloadWork} = require('../storage/storage.services');
const { recordTheme } = require('./themes.services');

const uploadTheme = async (req,res) => {
    const file = req.file;

    if(file === null || file === undefined){
        res.status(400).json({
            code:400,
            message:`No file found`
        });
    }else{
        //file found
        uploadWork(file,(err,info)=>{
            if(err){
                return res.status(500).json(err);
            }
            if(info == null){
                res.status(500).json({code:400,message:"can't fetch upload data"});
            }else{
                //file uploaded location available
                const { Location } = info;

                recordTheme(Location,(err)=>{
                    if(err){
                        return res.status(500).json(err);
                    }
                    return res.json({
                        code:200,
                        message:'theme recorded',
                        at:Location
                    });
                });
            }
        });
        
    }
}

const getTheme = async (req,res)=>{
    const num = Math.floor(20*Math.random())
    res.send(`${num}`);
}

module.exports = {uploadTheme,getTheme};