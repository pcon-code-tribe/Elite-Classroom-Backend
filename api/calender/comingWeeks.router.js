const { scheduleClass, cancelClass, rescheduleClass } = require('./comingWeeks.controller');
const router = require('express').Router();

router.post('/scheduleClass', scheduleClass);
router.delete('/cancelClass', cancelClass);
router.put('/rescheduleClass', rescheduleClass);

module.exports = router;