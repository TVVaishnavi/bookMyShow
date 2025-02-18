const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theatreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showTime: { type: Date, required: true },
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true }],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' },  // New field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', ticketSchema);
