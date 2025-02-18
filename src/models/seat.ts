// models/seat.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ISeat extends Document {
    theatreId: mongoose.Types.ObjectId;
    movieId: mongoose.Types.ObjectId;
    showTime: Date;
    status: string;
    bookedBy?: mongoose.Types.ObjectId;
    reservedAt?: Date;
}

const SeatSchema: Schema = new Schema({
    theatreId: { type: mongoose.Types.ObjectId, required: true },
    movieId: { type: mongoose.Types.ObjectId, required: true },
    showTime: { type: Date, required: true },
    status: { type: String, required: true },
    bookedBy: { type: mongoose.Types.ObjectId },
    reservedAt: { type: Date }
});

const Seat = mongoose.model<ISeat>('Seat', SeatSchema);
export default Seat;
export { ISeat };
