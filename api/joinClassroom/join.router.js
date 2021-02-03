const { joinClass } = require('./join.controller');
const router = require('express').Router();

router.post('/joinClass', joinClass);

module.exports = router;