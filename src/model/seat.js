const mongoose = require('mongoose')
const seatSchema = new mongoose.Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    showTime: {type: Date, required: true},
    seatNumber: {type: String, required: true},
    status: {type: String, enum: ['Available', 'Reserved', 'Booked'], default: 'Available'},
    bookedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    reservedAt: {type: Date, default: null},
})

module.exports = mongoose.model('Seat', seatSchema)