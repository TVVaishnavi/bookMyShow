const {createMovie, updateMovie, deleteMovie, getMovieById,getMovies} = require("../service/movie");

const createMovieController = async(req,res)=>{
    const movieData = req.body;
    try{
        const newMovie = await createMovie(movieData)
        return res.status(201).json({message: "movie created successfully", movie: newMovie})

    }catch(error){
        return res.status(500).json({message: error.message})
    }
};

const updateMovieController = async(req,res)=>{
    const movieId = req.params.movieId;
    const updateData = req.body;
    try {
        const updatedMovie = await updateMovie(movieId, updateData)
        return res.status(200).json({message: "movie updated successfully", movie: updatedMovie})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

const deleteMovieController = async (req, res) => {
    const movieId = req.params.movieId;
    try {
      await deleteMovie(movieId);
      return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

const searchMovies = async (req, res) => {
    const { title, genre, director, language } = req.query;
  
    try {
      const filter = {}; 
      if (title) filter.title = { $regex: title, $options: 'i' }
      if (genre) filter.genre = { $regex: genre, $options: 'i' }
      if (director) filter.director = { $regex: director, $options: 'i' }
      if (language) filter.language = { $regex: language, $options: 'i' }
  
      const movies = await getMovies(filter);
      return res.status(200).json({ movies });
    } catch (error) {
      return res.status(500).json({ message: 'Error searching movies' });
    }
  };
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