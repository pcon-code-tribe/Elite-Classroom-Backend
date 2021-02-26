const express = require('express');
const router = express.Router();
const {deleteSubmission} = require("./delete.controller");

router.delete('/:sid',deleteSubmission);

module.exports =  router;