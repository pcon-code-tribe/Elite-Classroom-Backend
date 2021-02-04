const express = require('express');
const router = express.Router();

router.use('/users', require('./users/user.router'));
router.use('/classrooms', require('./classrooms/classroom.router'));

router.use('/joinClassroom', require('./joinClassroom/join.router'));
router.use('/getClasses', require('./getClasses/getClasses.router'));

module.exports = router;
