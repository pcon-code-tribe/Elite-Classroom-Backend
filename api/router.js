const express = require('express');
const router = express.Router();




router.use('/users', require('./users/user.router'));


router.use('/classwork', require('./classwork/classwork.router'));


module.exports = router;