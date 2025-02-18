const Ticket = require("../model/ticket");
const Seat = require("../model/seat");

const bookTicket = async(userId, theatreId, movieId, showTime, seatIds) => {
    const seats = await Seat.find({_id: {$in: seatIds}, status: 'Available'});
    if(seats.length !== seatIds.length) {
        throw new Error("Some seats are already booked or unavailable");
    }
    const totalPrice = seats.length * 200;
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
};

const cancelTicket = async(ticketId, userId) => {
    const ticket = await Ticket.findOne({_id: ticketId, userId});
    if(!ticket) throw new Error('Ticket not found or you do not have permission');
    if(ticket.status === 'Cancelled') throw new Error('Ticket is already cancelled');
    
    ticket.status = 'Cancelled';
    ticket.paymentStatus = 'Refund Initiated';
    await ticket.save();

    await Seat.updateMany({_id: {$in: ticket.seats}}, {status: 'Available', bookedBy: null});
    return { message: 'Ticket cancelled successfully', ticket };
};

module.exports = { bookTicket, cancelTicket };
