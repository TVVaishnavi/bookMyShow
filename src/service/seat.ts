import Seat, { ISeat } from '../models/seat';
import mongoose from 'mongoose';
import { SEAT_STATUS, SEAT, RESERVATION_EXPIRATION } from '../constant';
import { validate } from 'class-validator'; 
import { GetAvailableSeatsDTO, ReserveSeatDTO, BookSeatDTO} from '../DTO/seat.dto';


const getAvailableSeats = async (theatreId: string, movieId: string, showTime: string, dto: GetAvailableSeatsDTO): Promise<ISeat[]>=>{
    const errors = await validate(dto);
    if (errors.length>0) throw new Error(JSON.stringify(errors));
    return await Seat.find({
        theatreId: dto.theatreId,
        movieId: dto.movieId,
        showTime: dto.showTime,
        status: SEAT_STATUS.AVAILABLE,
    });
};

export const reserveSeat = async (p0: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId, dto: ReserveSeatDTO)=>{
    const errors = await validate(dto);
    if(errors.length>0) throw new Error(JSON.stringify(errors));

    const seat = await Seat.findById(dto.seatId);
    if(!seat) throw new Error(SEAT.NOT_FOUND);
    seat.status = SEAT_STATUS.RESERVED;
    seat.bookedBy = new mongoose.Types.ObjectId(dto.userId);
    await seat.save();
    return seat;
};

const bookSeat = async (p0: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId, dto: BookSeatDTO): Promise<ISeat>=>{
    const errors = await validate(dto);
    if(errors.length>0) throw new Error(JSON.stringify(errors));
    const seat = await Seat.findById(dto.seatId);
    if(!seat || seat.status !== SEAT_STATUS.RESERVED || String(seat.bookedBy)!== String(dto.userId)){
        throw new Error(SEAT.UNAUTHORIZED_BOOKING);
    }
    seat.status = SEAT_STATUS.BOOKED;
    await seat.save();
    return seat;
}

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
