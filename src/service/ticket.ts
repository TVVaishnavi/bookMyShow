import Ticket from "../models/ticket";
import Seat from "../models/seat";

const bookTicket = async (userId: string, theatreId: string, movieId: string, showTime: Date, seatIds: string[]): Promise<any> => {
    const seats = await Seat.find({_id: {$in: seatIds}, status: 'Available'});
    if (seats.length !== seatIds.length) {
        throw new Error("Some seats are already booked or unavailable");
    }
    const totalPrice: number = seats.length * 200;
    await Seat.updateMany({_id: {$in: seatIds}}, {status: 'Booked', bookedBy: userId});
    const ticket = await Ticket.create({
        userId,
        theatreId,
        movieId,
        showTime,
        seats: seatIds,
        totalPrice,
        paymentStatus: 'Pending',
        status: 'Booked',
    });
    return ticket; 
}

const cancelTicket = async (ticketId: string, userId: string): Promise<{
    status: string; message: string; ticket?: any 
}> => {
    const ticket = await Ticket.findOne({ _id: ticketId, userId });

    if (!ticket) throw new Error('Ticket not found or you do not have permission');
    if (ticket.status === 'Cancelled') throw new Error('Ticket is already cancelled');

    ticket.status = 'Cancelled';
    ticket.paymentStatus = 'Refund Initiated'; // Make sure to update your Ticket model to accept this value
    await ticket.save();
    await Seat.updateMany({ _id: { $in: ticket.seats } }, { status: 'Available', bookedBy: null });

    return { status: 'Cancelled', message: 'Ticket cancelled successfully', ticket };
};

const ticketService = { bookTicket, cancelTicket };
export default ticketService;
