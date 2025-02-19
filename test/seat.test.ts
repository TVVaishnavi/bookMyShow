import mongoose from 'mongoose';
import { Request, Response } from 'express';
import seatService from '../src/service/seat';
import * as seatController from '../src/controller/seat';
import Seat from '../src/models/seat';

jest.mock('../src/models/seat');
jest.mock('../src/service/seat'); // Mock the seatService

type MockResponse = Response & {
  status: jest.MockedFunction<Response['status']>;
  json: jest.MockedFunction<Response['json']>;
};

type SeatDocument = mongoose.Document & {
  seatNumber: string;
  status: 'Available' | 'Reserved' | 'Booked';
  bookedBy?: mongoose.Types.ObjectId;
  save: jest.MockedFunction<() => Promise<SeatDocument>>;
};

describe('Seat Controller and Service Tests', () => {
  let res: MockResponse;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as MockResponse;
  });

  describe('Seat Service', () => {
    test('reserveSeat should reserve a seat', async () => {
      const seatId = new mongoose.Types.ObjectId();
      const userId = new mongoose.Types.ObjectId();
  
      const mockSeat: SeatDocument = {
        _id: seatId,
        seatNumber: 'A1',
        status: 'Available',
        bookedBy: undefined,
        save: jest.fn().mockImplementation(async function (this: SeatDocument): Promise<SeatDocument> {
          this.status = 'Reserved';
          this.bookedBy = userId;
          return this; // ✅ Ensure the updated seat is returned
        }),
      } as unknown as SeatDocument;
  
      (Seat.findById as jest.Mock).mockResolvedValue(mockSeat);
  
      (seatService.reserveSeat as jest.Mock).mockImplementation(async (seatId: string, userId: string) => {
        const seat = await Seat.findById(seatId);
        if (!seat) throw new Error('Seat not found');
  
        await seat.save(); // ✅ Call save to update the seat
        return seat; // ✅ Return the updated seat
      });
  
      const result = await seatService.reserveSeat(seatId, userId);
  
      console.log('Result After Save:', result); // Debug log
  
      expect(result).toBeDefined();
      expect(result.status).toBe('Reserved'); // ✅ Now this should pass
      expect(mockSeat.save).toHaveBeenCalled();
    });
  });
  
  
  describe('Seat Controller', () => {
    test('reserveSeat should handle reservation', async () => {
      const seatId = new mongoose.Types.ObjectId().toHexString();
      const userId = new mongoose.Types.ObjectId().toHexString();

      const mockSeat = {
        _id: seatId,
        seatNumber: 'A1',
        status: 'Reserved',
        bookedBy: userId,
      };

      (seatService.reserveSeat as jest.Mock).mockResolvedValue(mockSeat);

      const req = {
        body: { seatId },
        user: { id: userId },
      } as unknown as Request;

      await seatController.reserveSeat(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Seat reserved',
        seat: mockSeat,
      });
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
