const {updateMovie, deleteMovie, getMovieByName,getMovies} = require("../service/movie")
const Movie = require("../model/movie")

const createMovieController = async (req, res) => {
    try {
        const modata = req.body;
        
        const availableSeats = {
            premium: { rowA: [1,2,3,4,5,6,7,8,9,10], rowB: [1,2,3,4,5,6,7,8,9,10] },
            regular: { rowC: [1,2,3,4,5,6,7,8,9,10], rowD: [1,2,3,4,5,6,7,8,9,10], rowE: [1,2,3,4,5,6,7,8,9,10] },
            recliner: { rowF: [1,2,3,4,5] }
        };
  
        const movie = new Movie(modata);
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

const getMovieByNameController = async (req, res) => {
  const movieName = req.params['moviename'];
  console.log("Received request to find movie:", movieName); // ✅ Debugging log

  if (!movieName || movieName.includes(":")) {
      return res.status(400).json({ message: "Invalid movie name" });
  }

  try {
      const movie = await getMovieByName(movieName);
      return res.status(200).json({ movie });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};



const getMoviesController = async (req, res) => {
  const query = req.body;
  console.log("Received Query:", query); 
  try {
      const movies = await getMovies(query);
      console.log("Fetched Movies:", movies); 
      return res.status(200).json({ movies });
  } catch (error) {
      console.error("Controller Error:", error.message);
      return res.status(500).json({ message: error.message });
  }
};

module.exports = {createMovieController, updateMovieController, deleteMovieController, getMovieByNameController, getMoviesController, searchMovies}