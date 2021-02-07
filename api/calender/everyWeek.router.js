const { scheduleClass_everyWeek, getCalender_everyWeek, cancelClass_everyWeek, rescheduleClass_everyWeek }
 = require('./everyWeek.controller');
const router = require('express').Router();

router.post('/scheduleClass-everyWeek', scheduleClass_everyWeek);
router.get('/getCalender-everyWeek', getCalender_everyWeek);
router.delete('/cancelClass-everyWeek', cancelClass_everyWeek);
router.put('/rescheduleClass-everyWeek', rescheduleClass_everyWeek);

module.exports = router;