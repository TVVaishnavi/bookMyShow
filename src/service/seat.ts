import Seat, { ISeat } from '../models/seat';
import mongoose from 'mongoose';

interface GetAvailableSeatsParams {
    theatreId: string;
    movieId: string;
    showTime: Date;
}

const getAvailableSeats = async (theatreId: string, movieId: string,showTime: string): Promise<ISeat[]> => {
    return await Seat.find({ theatreId, movieId, showTime, status: 'Available' });
};

const reserveSeat = async (seatId: string, userId: mongoose.Types.ObjectId): Promise<ISeat> => {
    const seat = await Seat.findById(seatId);
    if (!seat || seat.status !== 'Available') {
        throw new Error('Seat is not available');
    }
    seat.status = 'Reserved';
    seat.bookedBy = userId;
    seat.reservedAt = new Date();
    await seat.save();
    return seat;
};

const bookSeat = async (seatId: string, userId: mongoose.Types.ObjectId): Promise<ISeat> => {
    const seat = await Seat.findById(seatId);
    if (!seat || seat.status !== 'Reserved' || String(seat.bookedBy) !== String(userId)) {
        throw new Error('Seat is not reserved or unauthorized booking');
    }
    seat.status = 'Booked';
    await seat.save();
    return seat;
};

async function releaseExpiredReservation(): Promise<void> {
    try {
        console.log("Releasing expired reservations...");
        const expirationTime = new Date(Date.now() - 5 * 60 * 1000);
        const result = await Seat.updateMany(
            { status: 'Reserved', reservedAt: { $lt: expirationTime } },
            { status: 'Available', bookedBy: null, reservedAt: null }
        );
        console.log(`Released ${result.modifiedCount} expired reservations.`);
    } catch (error) {
        console.error("Error in releasing reservations:", error);
    }
}
const seatService = {getAvailableSeats, reserveSeat, bookSeat, releaseExpiredReservation }
export default {seatService, getAvailableSeats, reserveSeat, bookSeat, releaseExpiredReservation };


