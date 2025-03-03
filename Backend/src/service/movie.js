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

const getMovieByName = async (movieName) => {
    try {
        console.log("Searching for movie with name:", movieName); // ✅ Debugging log

        const movie = await Movie.findOne({
            title: { $regex: new RegExp("^" + movieName + "$", "i") } // ✅ Case-insensitive search
        });

        console.log("MongoDB Query Result:", movie); // ✅ Check what MongoDB returns

        if (!movie) throw new Error("Movie not found");
        movie.availableSeats = movie.availableSeats || { premium: {}, regular: {}, recliner: {} };
        movie.bookedSeats = movie.bookedSeats || [];
        
        if(typeof(movie)===Array) return movie;
        else return [movie]
        
    } catch (error) {
        console.error("Error fetching movie:", error.message);
        throw new Error("Error fetching movie");
    }
};



const getMovies = async (query) => {
    try {
        const movie = await Movie.find(query)
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
module.exports = {createMovie, updateMovie, deleteMovie, getMovieByName, getMovies}