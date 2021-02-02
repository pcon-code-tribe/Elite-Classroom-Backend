const express = require('express');
const router = express.Router();

router.use('/users', require('./users/user.router'));
router.use('/classrooms', require('./classrooms/classroom.router'));

module.exports = router;
