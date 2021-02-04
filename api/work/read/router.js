const express = require('express');
const router = express.Router();
const {submission,work} = require("./controller")

router.get('/submission/:id',submission);

router.get('/work/:id',work);

module.exports = router;