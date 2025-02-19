import express, { Request, Response, NextFunction } from 'express';
import { bookTicket, cancelTicket } from '../controller/ticket';
const router = express.Router();

// Define type for the request and response
interface TicketRequest extends Request {
  params: {
    ticketId: string;
  };
}

router.post('/book', (req: Request, res: Response, next: NextFunction) => {
  bookTicket(req, res, next);
});

router.patch('/cancel/:ticketId', (req: TicketRequest, res: Response, next: NextFunction) => {
  cancelTicket(req, res, next);
});

export default router;
