import Ticket from "../models/ticket";
import Selection from "../models/seat"; 
import { PRICE, AVAILABILITY, PAYMENT, TICKET, ERROR, SUCCESS } from "../constant";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BookTicketDTO, CancelTicketDTO } from "../DTO/ticket.dto";

const bookTicket = async (data: BookTicketDTO): Promise<any> => {
    const dto = plainToInstance(BookTicketDTO, data);
    const errors = await validate(dto);
    if (errors.length > 0) throw new Error(JSON.stringify(errors));

    const selections = await Selection.find({ _id: { $in: dto.seatIds }, status: AVAILABILITY.OPEN });

    if (selections.length !== dto.seatIds.length) {
        throw new Error(ERROR.NOT_ENOUGH);
    }

    const totalCost: number = selections.length * PRICE;
    await Selection.updateMany({ _id: { $in: dto.seatIds } }, { status: AVAILABILITY.TAKEN, bookedBy: dto.userId });

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

const cancelTicket = async (data: CancelTicketDTO): Promise<{
  status: any; type: string; note: string; ticket?: any 
}> => {
    const dto = plainToInstance(CancelTicketDTO, data);
    const errors = await validate(dto);
    if (errors.length > 0) throw new Error(JSON.stringify(errors));

    const ticket = await Ticket.findOne({ _id: dto.ticketId, userId: dto.userId });

    if (!ticket) throw new Error(ERROR.NOT_FOUND);
    if (ticket.status === TICKET.CANCELED) throw new Error(ERROR.ALREADY_CANCELED);
    
    ticket.status = TICKET.CANCELED;
    ticket.paymentStatus = PAYMENT.REFUND_INITIATED;
    await ticket.save();

    await Selection.updateMany({ _id: { $in: ticket.seats } }, { status: AVAILABILITY.OPEN, bookedBy: null });

    return { status: SUCCESS, type: TICKET.CANCELED, note: SUCCESS.CANCELED, ticket };
};

const ticketService = { bookTicket, cancelTicket };
export default ticketService;
export { bookTicket, cancelTicket };
