const { scheduleClass_thisWeek, getCalender_thisWeek, cancelClass_thisWeek, rescheduleClass_thisWeek } = require('./thisWeek.controller');
const router = require('express').Router();

router.post('/scheduleClass-thisWeek', scheduleClass_thisWeek);
router.get('/getCalender-thisWeek', getCalender_thisWeek);
router.delete('/cancelClass-thisWeek', cancelClass_thisWeek);
router.put('/rescheduleClass-thisWeek', rescheduleClass_thisWeek);

module.exports = router;