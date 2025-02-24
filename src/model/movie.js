const mongoose = require('../config/database')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  cast: [{ type: Array }], 
  rating: { type: Number, min: 0, max: 10 }, 
  duration: { type: Number, required: true }, 
  language: { type: String, required: true },
  showTime: {type: Array, required: true },
  theatre: {type:Array, required: true},
  availableSeat: {type: String, required: true},
  BookedSeat: {type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
