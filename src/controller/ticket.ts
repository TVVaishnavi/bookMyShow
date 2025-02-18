import { Request, Response } from 'express';
import { createMovie, updateMovie, deleteMovie, getMovieById, getMovies } from "../service/movie";

const createMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieData: any = req.body;
    try {
        const newMovie: any = await createMovie(movieData);
        return res.status(201).json({ message: "movie created successfully", movie: newMovie });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

const updateMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieId: string = req.params.movieId;
    const updateData: any = req.body;
    try {
        const updatedMovie: any = await updateMovie(movieId, updateData);
        return res.status(200).json({ message: "movie updated successfully", movie: updatedMovie });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

const deleteMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieId: string = req.params.movieId;
    try {
        await deleteMovie(movieId);
        return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

const searchMovies = async (req: Request, res: Response): Promise<Response> => {
    const { title, genre, director, language }: { title?: string; genre?: string; director?: string; language?: string } = req.query;

    try {
        const filter: { [key: string]: any } = {};
        if (title) filter.title = { $regex: title, $options: 'i' };
        if (genre) filter.genre = { $regex: genre, $options: 'i' };
        if (director) filter.director = { $regex: director, $options: 'i' };
        if (language) filter.language = { $regex: language, $options: 'i' };

        const movies: any[] = await getMovies(filter);
        return res.status(200).json({ movies });
    } catch (error) {
        return res.status(500).json({ message: 'Error searching movies' });
    }
};

const getMovieByIdController = async (req: Request, res: Response): Promise<Response> => {
    const movieId:string= req.params.movieId;
    try {
        const movie:any= await getMovieById(movieId);
        return res.status(200).json({ movie });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
}

const getMoviesController = async (req :Request,res :Response):Promise<Response>=>{
   const query:any=req.query
   try{
      const movies:any[]=await getMovies(query)
      return res.status(200).json({movies})
   }catch(error){
      return res.status(500).json({message: (error as Error).message})
   }
}

export { createMovieController, updateMovieController, deleteMovieController, getMovieByIdController, getMoviesController, searchMovies };
