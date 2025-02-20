import movie from '../models/movie';
import { MOVIE_MESSAGESES } from '../constant'; 

interface MovieData {
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
        throw new Error(MOVIE_MESSAGESES.CREATE_ERROR); 
    }
}

const updateMovie = async (movieId: string, updatedData: Partial<MovieData>): Promise<any> => {
    try {
        const movies = await movie.findByIdAndUpdate(movieId, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!movies) throw new Error(MOVIE_MESSAGESES.NOT_FOUND); 
        return movies;
    } catch (error) {
        throw new Error(MOVIE_MESSAGESES.UPDATE_ERROR); 
    }
}

const deleteMovie = async (movieId: string): Promise<any> => {
    try {
        const movies = await movie.findByIdAndDelete(movieId);
        if (!movies) throw new Error(MOVIE_MESSAGESES.NOT_FOUND); 
        return movies;
    } catch (error) {
        throw new Error(MOVIE_MESSAGESES.DELETE_ERROR); 
    }
}

const getMovieById = async (movieId: string): Promise<any> => {
    try {
      const movies = await movie.findById(movieId);
      if (!movies) throw new Error(MOVIE_MESSAGESES.NOT_FOUND); 
      return movies;
    } catch (error) {
      throw new Error(MOVIE_MESSAGESES.FETCH_ERROR); 
    }
}

const getMovies = async (query: any): Promise<any[]> => { 
    try { 
      const movies = await movie.find(query); 
      return movies; 
    } catch (error) { 
      throw new Error(MOVIE_MESSAGESES.FETCH_ALL_ERROR); 
    } 
}

export { createMovie, updateMovie, deleteMovie, getMovieById, getMovies };
