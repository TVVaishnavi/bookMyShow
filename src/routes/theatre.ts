import express from 'express';
import { createTheatre, deleteTheatre, getAllTheatres, getTheatreById, searchTheatres, updateTheatre } from '../controller/theatre';

const router = express.Router();

router.post('/', async (req, res, next) => await createTheatre(req, res, next));
router.get('/', async (req, res, next) => await getAllTheatres(req, res, next));
router.get('/:id', async (req, res, next) => await getTheatreById(req, res, next));
router.put('/:id', async (req, res, next) => await updateTheatre(req, res, next));
router.delete('/:id', async (req, res, next) => await deleteTheatre(req, res, next));
router.get('/search', async (req, res, next) => await searchTheatres(req, res, next));



export default router;
