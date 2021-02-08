const { newClassroom, joinClass } = require('./classroom.controller');
const router = require('express').Router();

router.post('/newClassroom', newClassroom);
router.post('/joinClassroom', joinClass);

module.exports = router;
