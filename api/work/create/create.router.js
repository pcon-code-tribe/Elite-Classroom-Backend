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
    // var sql ="SELECT * FROM work_submission";
    var sql = "INSERT INTO class_works (class_code,title,description,type,attachment,created_date,due_date) VALUES ('1','assignment','dbms assignment',1,'aaaaaaaaaaaaaaaaa','2020-09-12','2020-10-12')";
    pool.query(sql,(err,result,field)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})
module.exports = router;