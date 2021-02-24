const router = require('express').Router();

router.use('/users', require('./users/user.router'));
router.use('/classrooms', require('./classrooms/classroom.router'));
router.use('/todos', require('./todos/todo.router'));
router.use('/classworks', require('./classwork/classwork.router'));
router.use('/getClasses', require('./getClasses/getClasses.router'));

router.use('/notes', require('./notes/notes.router'));
router.use('/work', require('./work/work.router'));
router.use('/storage', require('./storage/storage.router'));

router.use('/calender', require('./calender/comingWeeks.router'));
router.use('/routineWeek-calender', require('./calender/routine.router'));
router.use('/weekly-calender', require('./calender/getCalender.router'));


module.exports = router;



