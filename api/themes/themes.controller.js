const {uploadWork,downloadWork} = require('../storage/storage.services');
const { recordTheme,readTheme } = require('./theme.services.v2');
const fs = require('fs');
const {v4} = require('uuid');
const path = require('path');

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
    try{

        readTheme((err,info)=>{
            if(err){
                return res.status(500).json(err);
            }
            res.sendFile(path.join(__dirname,`../../${info.destination}`),(err)=>{
                if(err){
                    console.log(err);
                    res.status(500).send(err.message);
                }
                
                fs.unlink(path.join(__dirname,`../../${info.destination}`),(err)=>{
                    if(err){
                        console.log(err);
                    }
                });

            });
        })

    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {uploadTheme,getTheme};