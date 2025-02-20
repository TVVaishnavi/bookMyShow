import { Request, Response } from "express";
import { createMovie, updateMovie, deleteMovie, getMovieById, getMovies } from "../service/movie";
import { MOVIE_MESSAGES, MOVIE_QUERY_KEYS } from "../constant";

const createMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMovie = await createMovie(req.body);
        res.status(201).json({ message: MOVIE_MESSAGES.CREATED, movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const updateMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedMovie = await updateMovie(req.params.movieId, req.body);
        res.status(200).json({ message: MOVIE_MESSAGES.UPDATED, movie: updatedMovie });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const deleteMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteMovie(req.params.movieId);
        res.status(200).json({ message: MOVIE_MESSAGES.DELETED });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const searchMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const filter: Record<string, any> = {};
        MOVIE_QUERY_KEYS.forEach((key) => {
            if (req.query[key]) {
                filter[key] = { $regex: req.query[key], $options: "i" };
            }
        });

        const movies = await getMovies(filter);
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ message: MOVIE_MESSAGES.SEARCH_ERROR });
    }
};

const getMovieByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await getMovieById(req.params.movieId);
        res.status(200).json({ movie });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const getMoviesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await getMovies(req.query);
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export { createMovieController, updateMovieController, deleteMovieController, getMovieByIdController, getMoviesController, searchMovies };
