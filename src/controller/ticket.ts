import { Request, Response } from "express";
import { bookTicket as bookTicketService, cancelTicket as cancelTicketService } from "../service/ticket";
import { TICKET_MESSAGES } from "../constant";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BookTicketDTO, CancelTicketDTO } from "../DTO/ticket.dto";

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

export const bookTicket = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: TICKET_MESSAGES.NOT_AUTHENTICATED });
    }

    const dto = plainToInstance(BookTicketDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await bookTicketService({
      userId: req.user.id,
      theatreId: dto.theatreId,
      movieId: dto.movieId,
      showTime: dto.showTime,
      seatIds: dto.seatIds,
    });

    return res.status(201).json({ message: TICKET_MESSAGES.BOOKED });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message || "Internal Server Error" });
  }
};

export const cancelTicket = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: TICKET_MESSAGES.NOT_AUTHENTICATED });
    }

    const dto = plainToInstance(CancelTicketDTO, req.params);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const response = await cancelTicketService({ ticketId: dto.ticketId, userId: req.user.id });

    return res.status(200).json(response);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message || "Internal Server Error" });
  }
};

export default { bookTicket, cancelTicket };
