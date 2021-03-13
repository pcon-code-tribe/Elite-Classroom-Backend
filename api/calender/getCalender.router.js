const { getCalender_lastWeek, getCalender_thisWeek, getCalender_nextWeek} = require('./getCalender.controller');
const router = require('express').Router();

router.get('/getCalender-thisWeek/:google_token', getCalender_thisWeek);
router.get('/getCalender-nextWeek/:google_token', getCalender_nextWeek);
router.get('/getCalender-lastWeek/:google_token', getCalender_lastWeek);

module.exports = router;