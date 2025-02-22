const Movie = require('../model/movie')

const createMovie = async(movieData)=>{
    try{
        const show = new Movie(movieData)
        await show.save()
        return show
    }catch(error){
        throw new Error("Error creating movie")
    }
}

const updateMovie = async(movieId, updatedData)=>{
    try {
        const movie = await Movie.findByIdAndUpdate(movieId, updatedData,{
            new: true,
            runValidators: true,
        })
        if(!movie) throw new Error("movie not found")
        return movie
    } catch (error) {
        throw new Error("Error updating movie")
    }
}

const deleteMovie = async(movieId)=>{
    try {
        const movie = await Movie.findByIdAndDelete(movieId)
        if(!movie) throw new Error("Movie not found")
        return movie
    } catch (error) {
        throw new Error("Error deleting movie")
    }
}

const getMovieById = async (movieId) => {
    try {
      const movie = await Movie.findById(new mongoose.Types.ObjectId(movieId))
      if (!movie) throw new Error("Movie not found")
      return movie
    } catch (error) {
      throw new Error("Error fetching movie")
    }
}

const getMovies = async (query) => {
    try {
        const searchQuery ={}
        if(query.title){
            searchQuery.title = {$regex: query.title, $options: "i"}
        }
        const movie = await Movie.find(searchQuery)
        console.log("movie found:", movie)
        if(movie.length === 0){
            throw new Error("no movies found with the given criteria")
        } 
        return movie
    } catch (error) {
        console.error("Error fetching movies:", error)
        throw new Error("Error fetching movie:", +error.message)
    }
}
module.exports = {createMovie, updateMovie, deleteMovie, getMovieById, getMovies}