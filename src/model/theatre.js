const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', 
      },
    ],
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
      },
    },
    amenities: {
      type: [String], 
    },
  },
  { timestamps: true }
);

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;
