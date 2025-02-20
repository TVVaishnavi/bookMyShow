import Ticket, { ITicket } from "../models/ticket";
import Selection, { ISeat } from "../models/seat"; 
import { PRICE, AVAILABILITY, PAYMENT, TICKET, ERROR, SUCCESS } from "../constant";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BookTicketDTO, CancelTicketDTO } from "../DTO/ticket.dto";
import { Document } from "mongoose";

const bookTicket = async (userId: string, theatreId: string, movieId: string, showTime: Date, seatIds: string[], data: BookTicketDTO): Promise<Document & ITicket> => {
    // Validate DTO
    const dto = plainToInstance(BookTicketDTO, data);
    const errors = await validate(dto);
    if (errors.length > 0) throw new Error(JSON.stringify(errors));

    // Find available seats
    const selections: (Document & ISeat)[] = await Selection.find({ 
        _id: { $in: dto.seatIds }, 
        status: AVAILABILITY.OPEN 
    });

    if (selections.length !== dto.seatIds.length) {
        throw new Error(ERROR.NOT_ENOUGH);
    }

    // Calculate total price
    const totalCost: number = selections.length * PRICE;

    // Update seat status
    await Selection.updateMany(
        { _id: { $in: dto.seatIds } }, 
        { status: AVAILABILITY.TAKEN, bookedBy: dto.userId }
    );

    // Create a new ticket
    const ticket = await Ticket.create({
        userId: dto.userId,
        theatreId: dto.theatreId,
        movieId: dto.movieId,
        showTime: dto.showTime,
        seats: dto.seatIds,
        totalPrice: totalCost,
        paymentStatus: PAYMENT.DUE,
        status: TICKET.CONFIRMED,
    });

    return ticket;
};

const cancelTicket = async (_id: string, userId: string, data: CancelTicketDTO): Promise<{ 
    status: string; 
    type: string; 
    note: string; 
    ticket?: Document & ITicket;
  }> => {
      // Validate DTO
      const dto = plainToInstance(CancelTicketDTO, data);
      const errors = await validate(dto);
      if (errors.length > 0) throw new Error(JSON.stringify(errors));
  
      // Find the ticket
      const ticket = await Ticket.findOne({ _id: dto.ticketId, userId: dto.userId });
  
      if (!ticket) throw new Error(ERROR.NOT_FOUND);
      if (ticket.status === TICKET.CANCELED) throw new Error(ERROR.ALREADY_CANCELED);
      
      // Update ticket status
      ticket.status = TICKET.CANCELED;
      ticket.paymentStatus = PAYMENT.REFUND_INITIATED;
      await ticket.save();
  
      // Mark seats as available again
      await Selection.updateMany(
          { _id: { $in: ticket.seats } }, 
          { status: AVAILABILITY.OPEN, bookedBy: null }
      );
  
      return { 
          status: SUCCESS.CANCELED, 
          type: TICKET.CANCELED, 
          note: SUCCESS.CANCELED, 
          ticket 
      };
};
const ticketService = { bookTicket, cancelTicket };
export default ticketService;
export { bookTicket, cancelTicket };
