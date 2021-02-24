const { notTurnedIn, missing, turnedIn } = require('./todo.controller');
const router = require('express').Router();

router.get('/notTurnedIn/:google_token', notTurnedIn);
router.get('/missing/:google_token', missing);
router.get('/turnedIn/:google_token', turnedIn);

module.exports = router;
