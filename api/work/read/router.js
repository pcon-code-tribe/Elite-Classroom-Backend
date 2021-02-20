const express = require('express');
const router = express.Router();
const {submission,work,user,download} = require("./controller")


router.get('/submission/:id',submission);

router.get('/work/:id',work);

router.get('/work/:workid/:uid',user);

router.get('/download',download);
module.exports = router;