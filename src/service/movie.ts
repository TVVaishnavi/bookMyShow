import movie from '../models/movie';
import { MOVIE_MESSAGESES } from '../constant'; 
import { CreateMovieDTO, updatedMovieDTO } from '../DTO/movie.dto';

interface MovieData {
    title: string;
    director: string;
    releaseYear: number;
}

const createMovie = async (movieData: CreateMovieDTO): Promise<any> => {
    try {
        const newMovie = new movie(movieData);
        await newMovie.save();
        return newMovie;
    } catch (error) {
        throw new Error(MOVIE_MESSAGESES.CREATE_ERROR); 
    }
}

const updateMovie = async (movieId: string, updatedData: updatedMovieDTO): Promise<any> => {
    try {
        const updatedMovie = await movie.findByIdAndUpdate(movieId, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedMovie) throw new Error(MOVIE_MESSAGESES.NOT_FOUND); 
        return updatedMovie;
    } catch (error) {
        throw new Error(MOVIE_MESSAGESES.UPDATE_ERROR); 
    }
}

const deleteMovie = async (movieId: string): Promise<any> => {
    try {
        const deletedMovie = await movie.findByIdAndDelete(movieId);
        if (!deletedMovie) throw new Error(MOVIE_MESSAGESES.NOT_FOUND); 
        return deletedMovie;
    } catch (error) {
        throw new Error(MOVIE_MESSAGESES.DELETE_ERROR); 
    }
}

const getMovieById = async (movieId: string): Promise<any> => {
    try {
        const foundMovie = await movie.findById(movieId);
        if (!foundMovie) throw new Error(MOVIE_MESSAGESES.NOT_FOUND); 
        return foundMovie;
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
