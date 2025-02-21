const Seat = require('../model/seat')

const getAvailableSeats = async(theatreId, getMovieById, showTime)=>{
    return await Seat.find({theatreId, movieId, showTime, status: 'Available'})
}

const reserveSeat = async(seatId, userId)=>{
    const seat = await Seat.findById(seatId)
    if(!seat || seat.status !=='Available'){
        throw new Error('seat is not available')
    }
    seat.status = 'Reserved'
    seat.bookedBy = userId,
    seat.reservedAt = new Date()
    await seat.save()
    return seat
}
const bookSeat = async(seatId, userId)=>{
    const seat = await Seat.findById(seatId)
    if(!seat || seat.status !== 'Reserved' || String(seat.bookedBy) !== String(userId) ){
        throw new Error('seat is not reserved or unauthorized booking')
    }
    seat.status = 'Booked'
    await seat.save()
    return seat
}

async function releaseExpiredReservation() {
    try {
        const expirationTime = new Date(Date.now()-5*60*1000)
        const result = await Seat. updateMany(
            { status: 'Reserved', reservedAt: { $lt: expirationTime } },
            { status: 'Available', bookedBy: null, reservedAt: null }
        )
    } catch (error) {
        console.error("Error in releasing reservations:", error)
    }
}

module.exports = {getAvailableSeats, reserveSeat, bookSeat, releaseExpiredReservation}