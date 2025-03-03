const express = require("express");
const router = express.Router();
const { 
  createTheatreController, 
  getTheatresController, 
  getTheatresByMovieController, 
  getMoviesInTheatreController, 
  updateTheatreController, 
  deleteTheatreController, 
  bookSeatThroughTheatreController, searchTheatresController
} = require("../controller/theatre");
router.post("/search", searchTheatresController);
router.post("/create", createTheatreController);

router.get("/all", getTheatresController);

router.get("movies/:movieTitle",getTheatresByMovieController );

router.get("/:theatreName/movies", getMoviesInTheatreController);

router.put("/update/:id", updateTheatreController);

router.delete("/delete/:id", deleteTheatreController);

router.post("/book-seat", bookSeatThroughTheatreController);

module.exports = router;
