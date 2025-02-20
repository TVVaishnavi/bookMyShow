import mongoose, { Document, Schema } from 'mongoose';
import { SEAT_STATUS } from '../constant'; 

export interface ISeat extends Document {
  theatreId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  showTime: Date;
  status: string;
  bookedBy?: mongoose.Types.ObjectId;
  reservedAt?: Date;
}

const seatSchema: Schema<ISeat> = new Schema(
  {
    theatreId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Theatre',
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Movie',
    },
    showTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [SEAT_STATUS.AVAILABLE, SEAT_STATUS.RESERVED, SEAT_STATUS.BOOKED],
      default: SEAT_STATUS.AVAILABLE,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reservedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Seat = mongoose.model<ISeat>('Seat', seatSchema);

export default Seat;
