import express from 'express';
import { bookTicket, cancelTicket } from '../controller/ticket';
import { RequestHandler } from 'express';

const router = express.Router();

const bookTicketHandler: RequestHandler = async (req, res, next) => {
  try {
    await bookTicket(req, res);
  } catch (error) {
    next(error);
  }
};

const cancelTicketHandler: RequestHandler = async (req, res, next) => {
  try {
    await cancelTicket(req, res);
  } catch (error) {
    next(error);
  }
};

router.post('/book', bookTicketHandler);
router.patch('/cancel/:ticketId', cancelTicketHandler);

export default router;
