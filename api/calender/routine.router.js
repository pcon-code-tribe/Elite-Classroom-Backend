const { scheduleClass_routine, getCalender_routine, cancelClass_routine, rescheduleClass_routine }
 = require('./routine.controller');
const router = require('express').Router();

router.post('/scheduleClass-routine', scheduleClass_routine);
router.get('/getCalender-routine/:classCode', getCalender_routine);
router.delete('/cancelClass-routine', cancelClass_routine);
router.put('/rescheduleClass-routine', rescheduleClass_routine);

module.exports = router;