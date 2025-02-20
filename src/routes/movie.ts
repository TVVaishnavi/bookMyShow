import express, { Router } from 'express';
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


router.post('/create', authMiddleware.authenticateToken, createMovieController);
router.put('/:movieId', authMiddleware.authenticateToken, updateMovieController);
router.delete('/:movieId', authMiddleware.authenticateToken, deleteMovieController);
router.get('/search', searchMovies);
router.get('/:movieId', getMovieByIdController);
router.get('/', getMoviesController);


export default router;
