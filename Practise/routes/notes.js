const express = require('express');
const notesController = require('../controllers/notes');

const router = express.Router();

router.get('/add-note', notesController.getAddNote);
router.get('/notes', notesController.getNotes);
router.post('/notes', notesController.postAddNote);

module.exports = router;