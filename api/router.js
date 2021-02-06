const express = require('express');
const router = express.Router();

router.use('/users', require('./users/user.router'));
router.use('/classrooms', require('./classrooms/classroom.router'));
router.use('/todo', require('./todos/todo.router'));

router.use('/getClasses', require('./getClasses/getClasses.router'));
router.use('/calender', require('./calender/calender.router'));

module.exports = router;
