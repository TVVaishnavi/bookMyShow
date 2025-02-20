import mongoose, { Document, Schema } from 'mongoose';

interface ITicket extends Document {
  userId: mongoose.Types.ObjectId;
  theatreId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  showTime: Date;
  seats: mongoose.Types.ObjectId[];
  totalPrice: number;
  paymentStatus: 'Pending' | 'Paid' | 'Refund Initiated';
  status: 'Booked' | 'Cancelled';
  createdAt: Date;
}

const ticketSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theatreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showTime: { type: Date, required: true },
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true }],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid','Refund Initiated'], default: 'Pending' },
  status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' },  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITicket>('Ticket', ticketSchema);
export {ITicket}