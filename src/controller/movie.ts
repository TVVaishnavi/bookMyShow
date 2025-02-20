import { Request, Response } from "express";
import { createMovie, updateMovie, deleteMovie, getMovieById, getMovies } from "../service/movie";
import { MOVIE_MESSAGES, MOVIE_QUERY_KEYS } from "../constant";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateMovieDTO, updatedMovieDTO, DeleteMovieDTO, GetMovieByIdDTO, GetMoviesDTO } from "../DTO/movie.dto";


const createMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieData: CreateMovieDTO = plainToInstance(CreateMovieDTO, req.body);
        const errors = await validate(movieData);
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }
        const newMovie = await createMovie(movieData);
        res.status(201).json({ message: MOVIE_MESSAGES.CREATED, movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const updateMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const updateData: updatedMovieDTO = plainToInstance(updatedMovieDTO, req.body);
        const errors = await validate(updateData);
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }
        const updatedMovie = await updateMovie(req.params.movieId, updateData);
        res.status(200).json({ message: MOVIE_MESSAGES.UPDATED, movie: updatedMovie });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const deleteMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleteDto: DeleteMovieDTO = plainToInstance(DeleteMovieDTO, req.body);
        const errors = await validate(deleteDto);
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }
        await deleteMovie(deleteDto.movieId);
        res.status(200).json({ message: MOVIE_MESSAGES.DELETED });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const searchMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const filter: Record<string, {$regex: string; $options: string}> = {};
        MOVIE_QUERY_KEYS.forEach((key) => {
            const queryValue = req.query[key] as string | undefined;
            if (queryValue) {
                filter[key] = { $regex: queryValue, $options: "i" };
            }
        });

        const movies = await getMovies(filter);
        res.status(200).json({ movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: MOVIE_MESSAGES.SEARCH_ERROR });
    }
};

const getMovieByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieDto: GetMovieByIdDTO = plainToInstance(GetMovieByIdDTO, { movieId: req.params.movieId });
        const errors = await validate(movieDto);
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }
        const movie = await getMovieById(movieDto.movieId);
        res.status(200).json({ movie });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const getMoviesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const queryDto: GetMoviesDTO = plainToInstance(GetMoviesDTO, req.query);
        const errors = await validate(queryDto);
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const movies = await getMovies(queryDto);
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export { createMovieController, updateMovieController, deleteMovieController, getMovieByIdController, getMoviesController, searchMovies };
