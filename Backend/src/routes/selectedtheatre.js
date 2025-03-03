const express = require("express");
const router = express.Router();
const Movie = require("../model/movie"); 

router.get("/movies/:title/theatres", async (req, res) => {
  try {
    const { title } = req.params;
    console.log(`Fetching theatres for movie: ${title}`);

    // Find the movie by title
    const movie = await Movie.findOne({ title });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json({ theatres: movie.theatres }); 
  } catch (error) {
    console.error("Error fetching theatres:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
