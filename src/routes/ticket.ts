import mongoose, { Document, Schema } from 'mongoose';

interface ITicket extends Document {
  userId: Schema.Types.ObjectId;
  theatreId: Schema.Types.ObjectId;
  movieId: Schema.Types.ObjectId;
  showTime: Date;
  seats: Schema.Types.ObjectId[];
  totalPrice: number;
  paymentStatus: 'Pending' | 'Paid';
  status: 'Booked' | 'Cancelled';
  createdAt: Date;
}

const ticketSchema: Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theatreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showTime: { type: Date, required: true },
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true }],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum:['Pending', 'Paid'], default:'Pending' },
  status:{ type:String, enum:['Booked', 'Cancelled'], default:'Booked' },  
  createdAt:{ type:Number , default : Date.now }
});

export default mongoose.model<ITicket>('Ticket', ticketSchema);