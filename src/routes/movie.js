const express = require("express")
const { createMovieController, updateMovieController, deleteMovieController, getMovieByIdController, getMoviesController, searchMovies } = require("../controller/movie")
const router = express.Router()

router.get("/movies", searchMovies)
router.post("/movies/create", createMovieController)

router.put("/movies/:movieId", updateMovieController)

router.delete("/movies/:movieId", deleteMovieController)

router.get("/movies/:movieId", getMovieByIdController)

router.get("/movies/get", getMoviesController)

module.exports = router
