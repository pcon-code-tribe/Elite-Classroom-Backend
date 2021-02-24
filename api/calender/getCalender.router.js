const { getCalender_lastWeek, getCalender_thisWeek, getCalender_nextWeek} = require('./getCalender.controller');
const router = require('express').Router();

router.get('/getCalender-thisWeek/:classCode', getCalender_thisWeek);
router.get('/getCalender-nextWeek/:classCode', getCalender_nextWeek);
router.get('/getCalender-lastWeek/:classCode', getCalender_lastWeek);

module.exports = router;