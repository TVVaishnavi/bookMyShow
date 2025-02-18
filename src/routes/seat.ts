import express, { Router } from 'express';
import seatController from '../controller/seat';
import authMiddleware from '../middleware/authentication';

const router: Router = express.Router();

// Routes
router.get('/available', seatController.getAvailableSeats);
router.post('/reserve', seatController.reserveSeat);
router.post('/book', seatController.bookSeat);

export default router;
