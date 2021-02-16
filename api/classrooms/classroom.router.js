const {
  newClassroom,
  joinClass,
  getClassroom,
} = require('./classroom.controller');
const router = require('express').Router();

router.post('/newClassroom', newClassroom);
router.post('/joinClassroom', joinClass);
router.get('/:classCode', getClassroom);

module.exports = router;
