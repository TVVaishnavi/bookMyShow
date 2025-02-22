const express = require('express');
const router = express.Router();
const theatreController = require('../controller/theatre');

router.post('/', theatreController.createTheatre);

router.get('/', theatreController.getAllTheatres);

router.get('/:title', theatreController.getTheatreById);

router.put('/:title', theatreController.updateTheatre);

router.delete('/:title', theatreController.deleteTheatre);

router.post('/search', theatreController.searchTheatres);

module.exports = router;
