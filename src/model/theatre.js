const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true }
    },    
    seatingCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    movies: [
      {
        type: String,
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
