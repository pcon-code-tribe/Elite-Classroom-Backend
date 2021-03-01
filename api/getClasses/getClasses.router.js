const { classes } = require('./getClasses.controller');
const router = require('express').Router();

router.get('/classes/:google_token', classes);

module.exports = router;
