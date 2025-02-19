import { Request, Response } from 'express';
import seatService from '../service/seat';
import mongoose from 'mongoose';

export interface CustomRequest extends Request {
  query: { theatreId: string; movieId: string; showTime: string };
  user?: { id: mongoose.Types.ObjectId };
}

const getAvailableSeats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { theatreId, movieId, showTime } = req.query as { theatreId: string; movieId: string; showTime: string };
    const seats = await seatService.getAvailableSeats(theatreId, movieId, showTime);
    res.status(200).json({ seats });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const reserveSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { seatId } = req.body as { seatId: string };
    const userId = (req as CustomRequest).user?.id;
    if (!userId) throw new Error('Unauthorized');
    
    const seat = await seatService.reserveSeat(
      new mongoose.Types.ObjectId(seatId),
      new mongoose.Types.ObjectId(userId)
    );
    res.status(200).json({ message: 'Seat reserved', seat });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const bookSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { seatId } = req.body as { seatId: string };
    const userId = (req as CustomRequest).user?.id;
    if (!userId) throw new Error('Unauthorized');

    const seat = await seatService.bookSeat(seatId, userId);
    res.status(200).json({ message: 'Seat booked successfully', seat });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
const seatController = { getAvailableSeats, reserveSeat, bookSeat }
export default seatController
export { getAvailableSeats, reserveSeat, bookSeat };
