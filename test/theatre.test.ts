import theatreService from "../src/service/theatre";
import { createTheatre } from "../src/controller/theatre"; // ✅ Import the actual controller function
import Theatre from "../src/models/theatre";
import mongoose from "mongoose";
import { Request, Response } from "express";

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

  let mockTheatre: any;

  beforeAll(() => {
    mockTheatre = {
      ...mockTheatreData,
      _id: new mongoose.Types.ObjectId(), // ✅ Ensure a valid ObjectId
      save: jest.fn().mockResolvedValue(mockTheatreData),
    };

    (Theatre as unknown as jest.Mock).mockImplementation(() => mockTheatre);
  });

  describe("Theatre Service", () => {
    test("createTheatre should create a new theatre", async () => {
      jest.spyOn(theatreService, "createTheatre").mockResolvedValue(mockTheatre); // ✅ Properly mocked

      const result = await theatreService.createTheatre(mockTheatreData);
      expect(result).toEqual(mockTheatre);
      expect(theatreService.createTheatre).toHaveBeenCalledWith(mockTheatreData);
    });
  });

  describe("Theatre Controller", () => {
    test("createTheatre should respond with success message and created theatre", async () => {
      jest.spyOn(theatreService, "createTheatre").mockResolvedValue(mockTheatre); // ✅ Properly mocked

      const req = {
        body: mockTheatreData,
      } as Request;

      await createTheatre(req, res as Response); // ✅ Using the actual controller function

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
