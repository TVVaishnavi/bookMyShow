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
      return res.status(400).json({ message: TICKET_MESSAGES.NOT_AUTHENTICATED });
    }

    const dto = plainToInstance(BookTicketDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await bookTicketService(req.user.id, dto.theatreId, dto.movieId, dto.showTime, dto.seatIds);
    return res.status(201).json({ message: TICKET_MESSAGES.BOOKED });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const cancelTicket = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: TICKET_MESSAGES.NOT_AUTHENTICATED });
    }

    const dto = plainToInstance(CancelTicketDTO, req.params);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const response = await cancelTicketService(dto.ticketId, req.user.id);
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export default { bookTicket, cancelTicket };
