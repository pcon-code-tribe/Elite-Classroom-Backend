const {uploadWork,downloadWork,deleteWork} = require('./storage.services');
const {v4} = require('uuid');
const path = require('path');
const fs = require('fs');

module.exports = {
     upload: async(req,res) =>{
         const file =  req.file;
         if(file != null){

            // console.log(file);

            uploadWork(file,(err,info) =>{
                 if(err){
                     res.status(500).json(err);
                 }else{
                     if(info != null ){
                         res.send(info);
                     }else{
                         res.status(500).send('unable to fetch upload data');
                     }
                 }
            });

        }else{
             res.status(400).send('no file available');
         }
     },
     remove: async(req,res) =>{

        const url = req.query.url;

        if(url === undefined || url == null){
            res.status(400).send('no url available');
        }else{
            deleteWork(url,(err,info)=>{
                if(err){
                    res.status(500).send(err.message);
                }else{
                    if(info == null){
                        res.status(500).send('not sure for deletion');
                    }else{
                        res.sendStatus(200);
                    }
                }
            });
        }

     },
     download: async(req,res) =>{
        
        const name = req.query.url.split('/')[4];

        if(name == null || name === undefined){
            res.status(400).send('no file name found');
        }else{
            downloadWork(name,(err,info)=>{
                if(err){
                    console.log(err);
                    res.status(500).send(err.message);
                }else{
                    if(info == null){
                        res.status(500).send('unable to fetch data');
                    }else{
                        res.download(info.destination,`${v4()}.${info.extension}`,(err)=>{
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
                    }
                }
            });
        }

    }
 }