const express = require('express');
const router = express.Router();
const theatreController = require('../controller/theatre');

router.post('/', theatreController.createTheatre);

router.get('/', theatreController.getAllTheatres);

router.get('/:id', theatreController.getTheatreById);

router.put('/:id', theatreController.updateTheatre);

router.delete('/:id', theatreController.deleteTheatre);

router.get('/search', theatreController.searchTheatres);

module.exports = router;
