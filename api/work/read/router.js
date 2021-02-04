const express = require('express');
const router = express.Router();
const {submission,work,user} = require("./controller")

router.get('/submission/:id',submission);

router.get('/work/:id',work);

router.get('/work/:workid/:uid',user);
module.exports = router;