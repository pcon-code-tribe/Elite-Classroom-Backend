const express = require('express');
const router = express.Router();
const {submit,upload} = require('./create.controller')

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

module.exports = router;