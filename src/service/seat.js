const Seat = require('../model/seat')

const getAvailableSeats = async(theatreId, movieId, showTime)=>{
    return await Seat.find({theatreId, movieId, showTime, status: 'Available'})
}

const reserveSeat = async (seatId, userId) => {
    const seat = await Seat.findById(seatId);
    if (!seat || seat.status !== 'Available') {
        throw new Error('seat is not available');
    }
    seat.status = 'Reserved';
    seat.bookedBy = userId;
    await seat.save();
    return seat;
};

const bookSeat = async (seatId, userId) => {
    const seat = await Seat.findById(seatId);
    if (!seat || seat.status !== 'Reserved' || String(seat.bookedBy) !== String(userId)) {
        throw new Error('seat is not reserved or unauthorized booking');
    }
    seat.status = 'Booked';
    await seat.save();
    return seat;
};


async function releaseExpiredReservation() {
    try {
        console.log("Releaseing expired reservations..")
        const expirationTime = new Date(Date.now()-5*60*1000)
        const result = await Seat. updateMany(
            { status: 'Reserved', reservedAt: { $lt: expirationTime } },
            { status: 'Available', bookedBy: null, reservedAt: null }
        )
        console.log(`Released ${result.modifiedCount} expired reservations.`)
    } catch (error) {
        console.error("Error in releasing reservations:", error)
    }
}

module.exports = {getAvailableSeats, reserveSeat, bookSeat, releaseExpiredReservation}