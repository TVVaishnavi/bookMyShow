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


router.post('/create', authMiddleware.authenticateToken, (req: Request, res: Response) => createMovieController(req, res)); 
router.put('/:movieId', authMiddleware.authenticateToken, (req: Request<{ movieId: string }>, res: Response) => updateMovieController(req, res)); 
router.delete('/:movieId', authMiddleware.authenticateToken, (req: Request<{ movieId: string }>, res: Response) => deleteMovieController(req, res)); 
router.get('/search', (req: Request, res: Response) => searchMovies(req, res)); 
router.get('/:movieId', (req: Request<{ movieId: string }>, res: Response) => getMovieByIdController(req, res));
router.get('/', (req: Request, res: Response) => getMoviesController(req, res)); 

export default router;
