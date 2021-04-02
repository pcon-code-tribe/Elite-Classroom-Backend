const { feedback } = require('./feedback.controller');
const router = require('express').Router();

router.post('/submitFeedback', feedback);

module.exports = router;