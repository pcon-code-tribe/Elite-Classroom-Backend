const { getId, getCode, update, del, create } = require('./notes.controller');
const router = require('express').Router();

router.get('/getNotesId/:id', getId);
router.get('/getNotesCode/:class_code', getCode);
router.put('/updateNote/:id', update);
router.delete('/deleteNote/:id', del);
router.post('/createNotes/:class_code', create);

module.exports = router;
