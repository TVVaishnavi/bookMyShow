import movie from '../models/movie';

interface MovieData {
    // Define the properties of movieData according to your model
    title: string;
    director: string;
    releaseYear: number;
}

const createMovie = async (movieData: MovieData): Promise<any> => {
    try {
        const show = new movie(movieData);
        await show.save();
        return show;
    } catch (error) {
        throw new Error("Error creating movie");
    }
}

const updateMovie = async (movieId: string, updatedData: Partial<MovieData>): Promise<any> => {
    try {
        const movies = await movie.findByIdAndUpdate(movieId, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!movies) throw new Error("movie not found");
        return movies;
    } catch (error) {
        throw new Error("Error updating movie");
    }
}

const deleteMovie = async (movieId: string): Promise<any> => {
    try {
        const movies = await movie.findByIdAndDelete(movieId);
        if (!movies) throw new Error("Movie not found");
        return movies;
    } catch (error) {
        throw new Error("Error deleting movie");
    }
}

const getMovieById = async (movieId: string): Promise<any> => {
    try {
      const movies = await movie.findById(movieId);
      if (!movies) throw new Error("Movie not found");
      return movies;
    } catch (error) {
      throw new Error("Error fetching movie");
    }
}

const getMovies = async (query: any): Promise<any[]> => { 
    try { 
      const movies = await movie.find(query); 
      return movies; 
    } catch (error) { 
      throw new Error("Error fetching movies"); 
    } 
}

export { createMovie, updateMovie, deleteMovie, getMovieById, getMovies };