const {get, update, del, create} = require('./notes.controller');
const router = require('express').Router();

router.get('/getNotes/:id', get);
router.put('/updateNotes/:id', update);
router.delete('/deleteNotes/:id', del);
router.post('/createNotes/:class_code', create);

module.exports = router;