const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: { type: Object, required: true },
  movie: { type: Object, required: true },
  seats: [{ type: Object, required: true }],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' },  
});

module.exports = mongoose.model('Tickets', ticketSchema);
