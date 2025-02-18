import express, { Request, Response, Router } from 'express';
import theatreController from '../controller/theatre';

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => theatreController.createTheatre(req, res));

router.get('/', (req: Request, res: Response) => theatreController.getAllTheatres(req, res));

router.get('/:id', (req: Request, res: Response) => theatreController.getTheatreById(req, res));

router.put('/:id', (req: Request, res: Response) => theatreController.updateTheatre(req, res));

router.delete('/:id', (req: Request, res: Response) => theatreController.deleteTheatre(req, res));

router.get('/search', (req: Request, res: Response) => theatreController.searchTheatres(req, res));

export default router;