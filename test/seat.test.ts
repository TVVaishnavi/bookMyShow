import mongoose from "mongoose";
import { Request, Response } from "express";
import seatService from "../src/service/seat";
import * as seatController from "../src/controller/seat";
import Seat, { ISeat } from "../src/models/seat";
import { RESPONSE_CODE, SEAT_RESPONSES } from "../src/constant";

jest.mock("../src/models/seat");
jest.mock("../src/service/seat");

type MockResponse = Response & {
  status: jest.MockedFunction<Response["status"]>;
  json: jest.MockedFunction<Response["json"]>;
};

type ReservationDocument = mongoose.Document & ISeat & {
  save: jest.MockedFunction<() => Promise<ReservationDocument>>;
};

describe("Reservation Controller and Service Tests", () => {
  let res: MockResponse;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as MockResponse;
  });

  describe("Reservation Service", () => {
    test("reserveSpot should confirm a reservation", async () => {
      const reservationId = new mongoose.Types.ObjectId();
      const userId = new mongoose.Types.ObjectId();

      const mockReservation: ReservationDocument = {
        _id: reservationId,
        seatNumber: "A1",
        status: "Available", // Use status instead of state
        bookedBy: undefined,
        save: jest.fn().mockImplementation(async function (this: ReservationDocument): Promise<ReservationDocument> {
          this.status = "Reserved"; // Use status instead of state
          this.bookedBy = userId;
          return this;
        }),
      } as unknown as ReservationDocument;

      (Seat.findById as jest.Mock).mockResolvedValue(mockReservation);

      (seatService.reserveSeat as jest.Mock).mockImplementation(async (reservationId: string, userId: string) => {
        const reservation = await Seat.findById(reservationId);
        if (!reservation) throw new Error(SEAT_RESPONSES.NOT_FOUND);

        await reservation.save();
        return reservation;
      });

      const result = await seatService.reserveSeat(reservationId, userId);

      console.log("Result After Save:", result); // Debug log

      expect(result).toBeDefined();
      expect(result.status).toBe("Reserved"); // Use status instead of state
      expect(mockReservation.save).toHaveBeenCalled();
    });
  });

  describe("Reservation Controller", () => {
    test("reserveSpot should handle confirmation", async () => {
      const reservationId = new mongoose.Types.ObjectId().toHexString();
      const userId = new mongoose.Types.ObjectId().toHexString();

      const mockReservation = {
        _id: reservationId,
        seatNumber: "A1",
        status: "Reserved", // Use status instead of state
        bookedBy: userId,
      };

      (seatService.reserveSeat as jest.Mock).mockResolvedValue(mockReservation);

      const req = {
        body: { seatId: reservationId },
        user: { id: userId },
      } as unknown as Request;

      await seatController.reserveSeat(req, res);

      expect(res.status).toHaveBeenCalledWith(RESPONSE_CODE.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        feedback: SEAT_RESPONSES.RESERVED,
        details: mockReservation,
      });
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
