const { notTurnedIn, missing, turnedIn } = require('./todo.controller');
const router = require('express').Router();

router.get('/notTurnedIn/:reg_id', notTurnedIn);
router.get('/missing/:reg_id', missing);
router.get('/turnedIn/:reg_id', turnedIn);

module.exports = router;
