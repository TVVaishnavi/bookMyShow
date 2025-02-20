import { Document } from 'mongoose';
import Movie, { IMovie } from '../models/movie'; // Ensure IMovie is exported in the model file
import { MOVIE_MESSAGES } from '../constant';
import { CreateMovieDTO, updatedMovieDTO } from '../DTO/movie.dto';

const createMovie = async (movieData: CreateMovieDTO): Promise<Document & IMovie> => {
    try {
        const newMovie = new Movie(movieData);
        await newMovie.save();
        return newMovie;
    } catch (error) {
        console.log(error)
        throw new Error(MOVIE_MESSAGES.CREATED || "Error creating movie");
    }
};

const updateMovie = async (movieId: string, updatedData: updatedMovieDTO): Promise<Document & IMovie | null> => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedMovie) {
            throw new Error(MOVIE_MESSAGES.UPDATED || "Movie not found");
        }
        return updatedMovie;
    } catch (error) {
        console.log(error)
        throw new Error(MOVIE_MESSAGES.UPDATED || "Error updating movie");
    }
};

const deleteMovie = async (movieId: string): Promise<Document & IMovie | null> => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            throw new Error(MOVIE_MESSAGES.DELETED || "Movie not found");
        }
        return deletedMovie;
    } catch (error) {
        console.log(error)
        throw new Error(MOVIE_MESSAGES.DELETED || "Error deleting movie");
    }
};

const getMovieById = async (movieId: string): Promise<Document & IMovie | null> => {
    try {
        const foundMovie = await Movie.findById(movieId);
        if (!foundMovie) {
            throw new Error(MOVIE_MESSAGES.SEARCH_ERROR || "Movie not found");
        }
        return foundMovie;
    } catch (error) {
        console.log(error)
        throw new Error(MOVIE_MESSAGES.SEARCH_ERROR || "Error fetching movie");
    }
};

const getMovies = async (query: Record<string, unknown>): Promise<(Document & IMovie)[]> => {
    try {
        const movies = await Movie.find(query);
        return movies;
    } catch (error) {
        console.log(error)
        throw new Error(MOVIE_MESSAGES.SEARCH_ERROR || "Error fetching movies");
    }
};

export { createMovie, updateMovie, deleteMovie, getMovieById, getMovies };
