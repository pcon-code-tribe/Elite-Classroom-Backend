const express = require('express');
const router = express.Router();
const {update} = require('./update.controller');
const pool = require('../../../config/database');

require('dotenv').config();
const multer = require('multer');

const storage = multer.memoryStorage({
    destination: (req,file,callback)=>{
        callback(null,' ');
    }
});

const uploads =multer(storage).single('file');

router.post('/:uid/:wid/:sid',uploads,update);

router.get('/check',(req,res)=>{
    var sql = "SELECT * FROM work_submission";
    pool.query(sql,(err,result,fields)=>{
        res.json(result);
    })
})

module.exports = router;