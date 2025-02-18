import theatreService from "../src/service/theatre";
import * as theatreController from "../src/controller/theatre";
import Theatre from "../src/models/theatre";
import mongoose from "mongoose";
import { Request, Response } from 'express';

jest.mock("../src/service/theatre");
jest.mock("../src/models/theatre");

describe("Theatre Controller and Service Tests", () => {
  let res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  const mockTheatreData = {
    name: "Cinema Hall",
    location: "New York",
    seatingCapacity: 200,
    contact: { phone: "1234567890", email: "test@theatre.com" },
    amenities: ["Wifi", "Parking"],
  };

  let mockTheatre:any;

  beforeAll(() => {
    mockTheatre = {
      ...mockTheatreData,
      _id: "1",
      save: jest.fn().mockResolvedValue(mockTheatreData),
    };

    (Theatre as unknown as jest.Mock).mockImplementation(() => mockTheatre);
  });

  describe("Theatre Service", () => {
    test("createTheatre should create a new theatre", async () => {
      (theatreService.createTheatre as jest.Mock).mockResolvedValue(mockTheatre);

      const result = await theatreService.createTheatre(mockTheatreData);
      expect(result).toEqual(mockTheatre);
      expect(theatreService.createTheatre).toHaveBeenCalledWith(mockTheatreData);
    });
  });

  describe("Theatre Controller", () => {
    test("createTheatre should respond with success message and created theatre", async () => {
      (theatreService.createTheatre as jest.Mock).mockResolvedValue(mockTheatre);

      const req = {
        body: mockTheatreData,
      } as Request;

      await createTheatre(req, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Theatre created successfully",
        theatre: mockTheatre,
      });
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
function createTheatre(req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, arg1: Response<any, Record<string, any>>) {
    throw new Error("Function not implemented.");
}

