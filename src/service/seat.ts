import Seat, { ISeat } from '../models/seat';
import mongoose from 'mongoose';
import { SEAT_STATUS, SEAT, RESERVATION_EXPIRATION } from '../constant'; 

interface GetAvailableSeatsParams {
    theatreId: string;
    movieId: string;
    showTime: Date;
}

const getAvailableSeats = async (theatreId: string, movieId: string, showTime: string): Promise<ISeat[]> => {
    return await Seat.find({ theatreId, movieId, showTime, status: SEAT_STATUS.AVAILABLE });
};

export const reserveSeat = async (seatId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
    const seat = await Seat.findById(seatId);
    if (!seat) throw new Error(SEAT.NOT_FOUND);

    seat.status = SEAT_STATUS.RESERVED;
    seat.bookedBy = userId;
    await seat.save();

    return seat;
};

const bookSeat = async (seatId: string, userId: mongoose.Types.ObjectId): Promise<ISeat> => {
    const seat = await Seat.findById(seatId);
    if (!seat || seat.status !== SEAT_STATUS.RESERVED || String(seat.bookedBy) !== String(userId)) {
        throw new Error(SEAT.UNAUTHORIZED_BOOKING);
    }
    seat.status = SEAT_STATUS.BOOKED;
    await seat.save();
    return seat;
};

async function releaseExpiredReservation(): Promise<void> {
    try {
        console.log(SEAT.RELEASE_LOG);
        const expirationTime = new Date(Date.now() - RESERVATION_EXPIRATION);
        const result = await Seat.updateMany(
            { status: SEAT_STATUS.RESERVED, reservedAt: { $lt: expirationTime } },
            { status: SEAT_STATUS.AVAILABLE, bookedBy: null, reservedAt: null }
        );
        console.log(SEAT.RELEASE_SUCCESS(result.modifiedCount));
    } catch (error) {
        console.error(SEAT.RELEASE_ERROR, error);
    }
}

const seatService = { getAvailableSeats, reserveSeat, bookSeat, releaseExpiredReservation };
export default { seatService, getAvailableSeats, reserveSeat, bookSeat, releaseExpiredReservation };
