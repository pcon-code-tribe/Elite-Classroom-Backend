const express = require('express');
const router = express.Router();
const {submit,upload} = require('./create.controller')
const pool = require("../../../config/database");

require('dotenv').config();
const multer = require('multer');

const storage = multer.memoryStorage({
    destination: (req,file,callback)=>{
        callback(null,"../../../uploads");
    }
});

const uploads =multer(storage).single('file');

//route to submit work
router.post('/submit', submit);

//route to uploa attachment
router.post('/upload',uploads,upload);

router.get('/check',(req,res)=>{
    var sql ="SELECT * FROM work_submission";
    pool.query(sql,(err,result,field)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})
module.exports = router;