const {updateMovie, deleteMovie, getMovieById,getMovies} = require("../service/movie")
const Movie = require("../model/movie")

const createMovieController = async (req, res) => {
  try {
      const movie = new Movie(req.body);
      await movie.save();

      console.log("Movie saved:", movie);
      res.status(201).json({ message: "Movie created successfully", movie });
  } catch (error) {
      console.error("Error creating movie:", error.message);
      res.status(500).json({ message: "Error creating movie", error: error.message });
  }
};

const updateMovieController = async(req,res)=>{
    const movieId = req.params.movieId
    const updateData = req.body
    try {
        const updatedMovie = await updateMovie(movieId, updateData)
        return res.status(200).json({message: "movie updated successfully", movie: updatedMovie})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteMovieController = async (req, res) => {
    const movieId = req.params.movieId;
    try {
      await deleteMovie(movieId);
      return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}

const searchMovies = async (req, res) => {
  try {
      const { title, genre, director, language } = req.query
      
      const filter = {}
      if (title) filter.title = { $regex: title, $options: 'i' }
      if (genre) filter.genre = { $regex: genre, $options: 'i' }
      if (director) filter.director = { $regex: director, $options: 'i' }
      if (language) filter.language = { $regex: language, $options: 'i' }
      
      const movies = await getMovies(filter)
      
      return res.status(200).json({ movies })
  } catch (error) {
      console.error("Error fetching movies:", error)
      return res.status(500).json({ message: "Error searching movies", error: error.message })
  }
}

const getMovieByIdController = async (req, res) => {
    const movieId = req.params.movieId
    try {
      const movie = await getMovieById(movieId)
      return res.status(200).json({ movie })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
}

const getMoviesController = async (req, res) => {
    const query = req.query
    try {
      const movies = await getMovies(query)
      return res.status(200).json({ movies })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
}
module.exports = {createMovieController, updateMovieController, deleteMovieController, getMovieByIdController, getMoviesController, searchMovies}