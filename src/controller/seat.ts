import { Request, Response } from "express";
import seatService from "../service/seat";
import mongoose from "mongoose";
import { SEAT_MESSAGES } from "../constant";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { GetAvailableSeatsDTO, ReserveSeatDTO, BookSeatDTO } from "../DTO/seat.dto";

export interface CustomRequest extends Request {
  query: { theatreId: string; movieId: string; showTime: string };
  user?: { id: mongoose.Types.ObjectId };
}

const getAvailableSeats = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto = plainToInstance(GetAvailableSeatsDTO, req.query as Record<string, unknown>);
    
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Pass DTO argument to match service function signature
    const seats = await seatService.getAvailableSeats(dto.theatreId, dto.movieId, dto.showTime, dto);
    return res.status(200).json({ seats });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

const reserveSeat = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as CustomRequest).user?.id;
    if (!userId) {
      return res.status(401).json({ message: SEAT_MESSAGES.UNAUTHORIZED });
    }

    const dto = plainToInstance(ReserveSeatDTO, { ...req.body, userId: userId.toString() });

    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Pass `dto` as required by `reserveSeat`
    const seat = await seatService.reserveSeat(new mongoose.Types.ObjectId(dto.seatId), userId, dto);
    return res.status(200).json({ message: SEAT_MESSAGES.RESERVED, seat });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

const bookSeat = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as CustomRequest).user?.id;
    if (!userId) {
      return res.status(401).json({ message: SEAT_MESSAGES.UNAUTHORIZED });
    }

    const dto = plainToInstance(BookSeatDTO, { ...req.body, userId: userId.toString() });

    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Pass `dto` to `bookSeat` function
    const seat = await seatService.bookSeat(new mongoose.Types.ObjectId(dto.seatId), userId, dto);
    return res.status(200).json({ message: SEAT_MESSAGES.BOOKED, seat });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

const seatController = { getAvailableSeats, reserveSeat, bookSeat };
export { seatController };

// Removed redundant 'reserveSeat' function at the bottom
