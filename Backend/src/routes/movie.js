const express = require("express")
const { createMovieController, updateMovieController, deleteMovieController, getMovieByNameController, getMoviesController, searchMovies } = require("../controller/movie")
const router = express.Router()
const Movie = require("../model/movie")

router.get("/movies", searchMovies)
router.post("/movies/create", createMovieController)

router.put("/movies/:movieId", updateMovieController)

router.delete("/movies/:movieId", deleteMovieController)

router.get("/movies/name/:moviename", getMovieByNameController);

router.post("/movies/get", getMoviesController)

router.get("/showtimes/:date", async (req, res) => {
    try {
      const { date } = req.params;
  
      const movies = await Movie.find({
        "showtimes.date": date, 
      });
  
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: "Error fetching movies for selected date" });
    }
  });


module.exports = router
