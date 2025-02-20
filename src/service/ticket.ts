import Ticket from "../models/ticket";
import Selection from "../models/seat"; 
import { PRICE, AVAILABILITY, PAYMENT, TICKET, ERROR, SUCCESS } from "../constant";

const bookTicket = async (
    userId: string, 
    theatreId: string, 
    movieId: string, 
    showTime: Date, 
    selectionIds: string[]
): Promise<any> => {
    const selections = await Selection.find({ _id: { $in: selectionIds }, status: AVAILABILITY.OPEN });

    if (selections.length !== selectionIds.length) {
        throw new Error(ERROR.NOT_ENOUGH);
    }

    const totalCost: number = selections.length * PRICE;
    await Selection.updateMany({ _id: { $in: selectionIds } }, { status: AVAILABILITY.TAKEN, bookedBy: userId });

    const ticket = await Ticket.create({
        userId,
        theatreId,
        movieId,
        showTime,
        seats: selectionIds,
        totalPrice: totalCost,
        paymentStatus: PAYMENT.DUE,
        status: TICKET.CONFIRMED,
    });

    return ticket;
};

const cancelTicket = async (
    ticketId: string, 
    userId: string
): Promise<{
  status: any; type: string; note: string; ticket?: any 
}> => {
    const ticket = await Ticket.findOne({ _id: ticketId, userId });

    if (!ticket) throw new Error(ERROR.NOT_FOUND);
    if (ticket.status === TICKET.CANCELED) throw new Error(ERROR.ALREADY_CANCELED);
    (ticket.status as string) = TICKET.CANCELED;
    (ticket.paymentStatus as string) = PAYMENT.REFUND;
    await ticket.save();

    await Selection.updateMany({ _id: { $in: ticket.seats } }, { status: AVAILABILITY.OPEN, bookedBy: null });

    return  { status: SUCCESS, type: TICKET.CANCELED, note: SUCCESS.CANCELED, ticket };
};

const ticketService = { bookTicket, cancelTicket };
export default ticketService;
export { bookTicket, cancelTicket };
