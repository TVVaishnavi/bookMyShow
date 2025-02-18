import { Request, Response } from 'express';
import { createMovie, updateMovie, deleteMovie, getMovieById, getMovies } from "../service/movie";

const createMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMovie = await createMovie(req.body);
        res.status(201).json({ message: "Movie created successfully", movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const updateMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedMovie = await updateMovie(req.params.movieId, req.body);
        res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const deleteMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteMovie(req.params.movieId);
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const searchMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const filter: Record<string, any> = {};
        if (req.query.title) filter.title = { $regex: req.query.title, $options: 'i' };
        if (req.query.genre) filter.genre = { $regex: req.query.genre, $options: 'i' };
        if (req.query.director) filter.director = { $regex: req.query.director, $options: 'i' };
        if (req.query.language) filter.language = { $regex: req.query.language, $options: 'i' };

        const movies = await getMovies(filter);
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ message: "Error searching movies" });
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
