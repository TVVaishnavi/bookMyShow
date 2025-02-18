import express, { Router, Request, Response } from 'express';
import {
  createMovieController,
  updateMovieController,
  deleteMovieController,
  getMovieByIdController,
  getMoviesController,
  searchMovies
} from '../controller/movie';
import authMiddleware from '../middleware/authentication';

const router: Router = express.Router();

// Routes
router.post('/create', authMiddleware.authenticateToken, (req: Request, res: Response) => createMovieController(req, res)); // Create a new movie (Protected)
router.put('/:movieId', authMiddleware.authenticateToken, (req: Request<{ movieId: string }>, res: Response) => updateMovieController(req, res)); // Update a movie (Protected)
router.delete('/:movieId', authMiddleware.authenticateToken, (req: Request<{ movieId: string }>, res: Response) => deleteMovieController(req, res)); // Delete a movie (Protected)
router.get('/search', (req: Request, res: Response) => searchMovies(req, res)); // Search movies
router.get('/:movieId', (req: Request<{ movieId: string }>, res: Response) => getMovieByIdController(req, res)); // Get a movie by ID
router.get('/', (req: Request, res: Response) => getMoviesController(req, res)); // Get all movies

export default router;
