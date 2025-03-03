const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  posterURL: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  cast: [{ type: String }],
  rating: { type: Number, min: 0, max: 10 },
  duration: { type: Number, required: true },
  language: { type: String, required: true },
  
  theatres: [
    {
      name: { type: String, required: true }, // Theatre Name
      location: { type: String, required: true }, // Theatre Location
      showTimes: [{ type: String, required: true }] // Available show timings
    }
  ],

  availableSeats: {
    premium: {
        rowA: [Number],
        rowB: [Number]
    },
    regular: {
        rowC: [Number],
        rowD: [Number],
        rowE: [Number]
    },
    recliner: {
        rowF: [Number]
    }
  }, 
  bookedSeats: [{ type: String, required: true }], 
  createdAt: { type: Date, default: Date.now }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
