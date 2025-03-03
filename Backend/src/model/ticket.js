const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    movieTitle: { type: String, required: true, trim: true },
    theatreName: { type: String, required: true, trim: true },
    showTime: { type: Date, required: true },
    seatNumbers: { type: [String], required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);

