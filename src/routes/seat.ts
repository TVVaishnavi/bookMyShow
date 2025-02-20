import express, { Router } from 'express';
import { getAvailableSeats, reserveSeat, bookSeat } from '../controller/seat';


const router: Router = express.Router();

router.get('/available', getAvailableSeats);
router.post('/reserve', reserveSeat);
router.post('/book', bookSeat);

export default router;
