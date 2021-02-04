const { newClassroom } = require('./classroom.controller');
const router = require('express').Router();

router.post('/newClassroom', newClassroom);

module.exports = router;
