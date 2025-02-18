const mongoose = require('mongoose');
const seatService = require('../src/service/seat');
const seatController = require('../src/controller/seats');
const Seat = require('../src/model/seat');

jest.mock('../src/model/seat'); 

describe('Seat Controller and Service Tests', () => {
  let res;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('Seat Service', () => {
    test('getAvailableSeats should return available seats', async () => {
      const mockSeats = [{ seatNumber: 'A1', status: 'Available' }];
      
      Seat.find.mockResolvedValue(mockSeats);

      jest.spyOn(seatService, 'getAvailableSeats').mockImplementation(async () => {
        return await Seat.find({
          theatreId: 'theatreId',
          movieId: 'movieId',
          showTime: expect.any(Date),
          status: 'Available',
        });
      });

      const result = await seatService.getAvailableSeats('theatreId', 'movieId', new Date());
      expect(result).toEqual(mockSeats);
      expect(Seat.find).toHaveBeenCalledWith({
        theatreId: 'theatreId',
        movieId: 'movieId',
        showTime: expect.any(Date),
        status: 'Available',
      });
    });

    test('reserveSeat should reserve a seat', async () => {
      const mockSeat = {
        seatNumber: 'A1',
        status: 'Available',
        save: jest.fn(), 
      };
      Seat.findById.mockResolvedValue(mockSeat);

      jest.spyOn(seatService, 'reserveSeat').mockImplementation(async (seatId, userId) => {
        const seat = await Seat.findById(seatId);
        if (!seat || seat.status !== 'Available') {
          throw new Error('seat is not available');
        }
        seat.status = 'Reserved';
        seat.bookedBy = userId;
        await seat.save(); 
        return seat;
      });

      const result = await seatService.reserveSeat('seatId', 'userId');
      expect(result.status).toBe('Reserved');
      expect(result.bookedBy).toBe('userId');
      expect(mockSeat.save).toHaveBeenCalled();
    });

    test('bookSeat should book a reserved seat', async () => {
      const mockSeat = {
        seatNumber: 'A1',
        status: 'Reserved',
        bookedBy: 'userId',
        save: jest.fn(),
      };
      Seat.findById.mockResolvedValue(mockSeat);

      jest.spyOn(seatService, 'bookSeat').mockImplementation(async (seatId, userId) => {
        const seat = await Seat.findById(seatId);
        if (!seat || seat.status !== 'Reserved') {
          throw new Error('seat is not reserved or unauthorized booking');
        }
        seat.status = 'Booked';
        await seat.save();
        return seat;
      });

      const result = await seatService.bookSeat('seatId', 'userId');
      expect(result.status).toBe('Booked');
      expect(mockSeat.save).toHaveBeenCalled();
    });
  });

  describe('Seat Controller', () => {
    test('getAvailableSeats should return seats', async () => {
      const mockSeats = [{ seatNumber: 'A1', status: 'Available' }];
      seatService.getAvailableSeats.mockResolvedValue(mockSeats);

      const req = { query: { theatreId: 'theatreId', movieId: 'movieId', showTime: new Date() } };
      await seatController.getAvailableSeats(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ seats: mockSeats });
    });

    test('reserveSeat should reserve a seat', async () => {
      const mockSeat = { seatNumber: 'A1', status: 'Reserved', bookedBy: 'userId' };
      seatService.reserveSeat.mockResolvedValue(mockSeat);

      const req = { body: { seatId: 'seatId' }, user: { id: 'userId' } };
      await seatController.reserveSeat(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Seat reserved',
        seat: mockSeat,
      });
    });

    test('bookSeat should book a reserved seat', async () => {
      const mockSeat = { seatNumber: 'A1', status: 'Booked' };
      seatService.bookSeat.mockResolvedValue(mockSeat);

      const req = { body: { seatId: 'seatId' }, user: { id: 'userId' } };
      await seatController.bookSeat(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Seat booked successfully',
        seat: mockSeat,
      });
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
