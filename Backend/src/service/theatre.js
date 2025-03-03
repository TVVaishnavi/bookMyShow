const Theatre = require("../model/theatre");
const Movie = require("../model/movie");

const searchTheatres = async({theatreName, location, movie})=>{
  try {
    const {theatreName, location, movie} = searchData
    let query = {}
    if(theatreName) query.theatreName = new RegExp(theatreName, "i")
    if(location) query.location = new RegExp(location, "i")
    if(movie) query.movies = {$in: [movie]}

    const theatres = await Theatre.find(query)
    return theatres
  } catch (error) {
    throw new Error("Error searching theatres")
  }
}

const createTheatre = async (theatreData) => {
  try {
    const theatre = new Theatre(theatreData);
    await theatre.save();
    return theatre;
  } catch (error) {
    throw new Error("Error creating theatre: " + error.message);
  }
};

const getTheatres = async (query) => {
  try {
    return await Theatre.find(query);
  } catch (error) {
    throw new Error("Error fetching theatres");
  }
};

const getTheatresByMovieName = async (movieName) => {
  try {
    const movie = await Movie.findOne({ title: movieName });

    if (!movie) throw new Error("Movie not found");
    const theatres = await Theatre.find({ name: { $in: movie.theatre } });

    if (theatres.length === 0) throw new Error("No theatres found for this movie");

    return theatres;
  } catch (error) {
    throw new Error(error.message);
  }
};


const getMoviesInTheatre = async (theatreName) => {
  try {
    const theatre = await Theatre.findOne({ name: theatreName });
    if (!theatre) throw new Error("Theatre not found");

    return theatre.movies;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ✅ Admin: Update theatre details
const updateTheatre = async (theatreId, updatedData) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(theatreId, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!theatre) throw new Error("Theatre not found");
    return theatre;
  } catch (error) {
    throw new Error("Error updating theatre: " + error.message);
  }
};

// ✅ Admin: Delete a theatre
const deleteTheatre = async (theatreId) => {
  try {
    const theatre = await Theatre.findByIdAndDelete(theatreId);
    if (!theatre) throw new Error("Theatre not found");
    return theatre;
  } catch (error) {
    throw new Error("Error deleting theatre: " + error.message);
  }
};

// ✅ Book a seat through a theatre
const bookSeatThroughTheatre = async (theatreName, movieName, seatNumber) => {
  try {
    // Find the movie by title and theatre name
    const movie = await Movie.findOne({ title: movieName, theatre: theatreName });

    if (!movie) throw new Error("Movie not found in this theatre");

    // Check if the seat is available
    if (!movie.availableSeat.includes(seatNumber)) {
      throw new Error("Seat already booked or not available");
    }

    // Remove seat from available seats
    movie.availableSeat = movie.availableSeat.filter(seat => seat !== seatNumber);
    movie.bookedSeat.push(seatNumber);

    await movie.save();

    return { message: "Seat booked successfully", bookedSeat: seatNumber };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { 
  createTheatre, 
  getTheatres, 
  getTheatresByMovieName, 
  getMoviesInTheatre, 
  updateTheatre, 
  deleteTheatre, 
  bookSeatThroughTheatre,
  searchTheatres
};
