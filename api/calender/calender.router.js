const { scheduleClass, getCalender, cancelClass, rescheduleClass } = require('./calender.controller');
const router = require('express').Router();

router.post('/scheduleClass', scheduleClass);
router.get('/getCalender', getCalender);
router.delete('/cancelClass', cancelClass);
router.put('/rescheduleClass', rescheduleClass);

module.exports = router;