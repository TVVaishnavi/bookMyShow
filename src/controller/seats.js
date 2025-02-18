const seatService = require('../service/seat');

const getAvailableSeats = async (req, res) => {
  try {
    const { theatreId, movieId, showTime } = req.query;
    const seats = await seatService.getAvailableSeats(theatreId, movieId, showTime);
    res.status(200).json({ seats });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const reserveSeat = async (req, res) => {
  try {
    const { seatId } = req.body;
    const userId = req.user.id; 
    const seat = await seatService.reserveSeat(seatId, userId);
    res.status(200).json({ message: 'Seat reserved', seat });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const bookSeat = async (req, res) => {
  try {
    const { seatId } = req.body;
    const userId = req.user.id;
    const seat = await seatService.bookSeat(seatId, userId);
    res.status(200).json({ message: 'Seat booked successfully', seat });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAvailableSeats, reserveSeat, bookSeat };
