const { getId, get, update, del, create } = require('./classwork.controller');
const router = require('express').Router();
router.get('/getworkById/:id', getId);
router.get('/getClasswork/:class_code', get);
router.put('/updateClasswork/:work_id', update);
router.delete('/deleteClasswork/:work_id', del);
router.post('/createClasswork', create);

module.exports = router;