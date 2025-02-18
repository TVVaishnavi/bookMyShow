const movie = require('../model/movie')

const createMovie = async(movieData)=>{
    try{
        const show = new movie(movieData)
        await show.save()
        return show
    }catch(error){
        throw new Error("Error creating movie")
    }
}

const updateMovie = async(movieId, updatedData)=>{
    try {
        const movies = await movie.findByIdAndUpdate(movieId, updatedData,{
            new: true,
            runValidators: true,
        })
        if(!movies) throw new Error("movie not found")
        return movies
    } catch (error) {
        throw new Error("Error updating movie")
    }
}

const deleteMovie = async(movieId)=>{
    try {
        const movies = await movie.findByIdAndDelete(movieId)
        if(!movies) throw new Error("Movie not found")
        return movies
    } catch (error) {
        throw new Error("Error deleting movie");
    }
}

const getMovieById = async (movieId) => {
    try {
      const movies = await movie.findById(movieId)
      if (!movies) throw new Error("Movie not found")
      return movies
    } catch (error) {
      throw new Error("Error fetching movie")
    }
}

const getMovies = async (query) => {
    try {
      const movies = await movie.find(filter)
      return movies
    } catch (error) {
      throw new Error("Error fetching movies")
    }
}
module.exports = {createMovie, updateMovie, deleteMovie, getMovieById, getMovies}