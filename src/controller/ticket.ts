import { Request, Response } from 'express';
import { bookTicket as bookTicketService, cancelTicket as cancelTicketService } from '../service/ticket';

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

interface TicketParams {
  ticketId: string;
}

export const bookTicket = async (req: CustomRequest, res: Response, next: unknown): Promise<void> => {
  try {
    const { theatreId, movieId, showTime, seatIds }: { theatreId: string; movieId: string; showTime: Date; seatIds: string[] } = req.body;
    if (req.user) {
      const ticket = await bookTicketService(req.user.id, theatreId, movieId, showTime, seatIds);
      res.status(201).json({ message: 'Ticket booked successfully' });
    } else {
      res.status(400).json({ message: 'User not authenticated' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelTicket = async (req: CustomRequest & { params: TicketParams }, res: Response, next: unknown): Promise<void> => {
  try {
    const { ticketId } = req.params;
    if (req.user) {
      const response = await cancelTicketService(ticketId, req.user.id);
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: 'User not authenticated' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export default { bookTicket, cancelTicket };
