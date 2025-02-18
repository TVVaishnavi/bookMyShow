import mongoose from 'mongoose';
import { Request, Response } from 'express';
import seatService from '../src/service/seat';
import * as seatController from '../src/controller/seat';
import Seat from '../src/models/seat';

jest.mock('../src/models/seat');

type MockResponse = Response & {
  status: jest.MockedFunction<Response['status']>;
  json: jest.MockedFunction<Response['json']>;
};

type SeatDocument = mongoose.Document & {
  seatNumber: string;
  status: 'Available' | 'Reserved' | 'Booked';
  bookedBy?: mongoose.Types.ObjectId;
  save: () => Promise<SeatDocument>;
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
      const mockSeat = {
        _id: new mongoose.Types.ObjectId(),
        seatNumber: 'A1',
        status: 'Available',
        save: jest.fn().mockResolvedValue(true),
      } as unknown as SeatDocument;

      (Seat.findById as jest.Mock).mockResolvedValue(mockSeat);

      // Fixed: Convert string IDs to ObjectId
      const result = await seatService.reserveSeat(
        new mongoose.Types.ObjectId('seatId'), // ObjectId
        new mongoose.Types.ObjectId('userId')  // ObjectId
      );

      expect(result.status).toBe('Reserved');
      expect(mockSeat.save).toHaveBeenCalled();
    });
  });

  describe('Seat Controller', () => {
    test('reserveSeat should handle reservation', async () => {
      const mockSeat = { 
        _id: new mongoose.Types.ObjectId(),
        seatNumber: 'A1', 
        status: 'Reserved', 
        bookedBy: new mongoose.Types.ObjectId() 
      } as SeatDocument;
      
      (seatService.reserveSeat as jest.Mock).mockResolvedValue(mockSeat);

      const req = { 
        body: { seatId: 'seatId' }, 
        user: { id: 'userId' } 
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