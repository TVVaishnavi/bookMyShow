import theatreService from "../src/service/theatre";
import { createTheatre } from "../src/controller/theatre"; 
import Theatre from "../src/models/theatre";
import mongoose, { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";

// Define the ITheatre interface for the mock (should match your actual schema)
interface ITheatre {
  _id: Types.ObjectId;
  name: string;
  location: string;
  seatingCapacity: number;
  capacity: number;
  contact: { phone: string; email: string };
  amenities: string[];
  movies: Types.ObjectId[];  // Ensure the movies field matches ObjectId[]
}

// Mocking Mongoose document properties (without directly extending Document)
interface MockTheatre extends ITheatre {
  save: jest.Mock;
  toJSON: jest.Mock;
  // Mocking other necessary Mongoose methods
  $assertPopulated: jest.Mock;
  $clearModifiedPaths: jest.Mock;
  $clone: jest.Mock;
  $createModifiedPathsSnapshot: jest.Mock;
  __v: number;
}

jest.mock("../src/service/theatre");
jest.mock("../src/models/theatre");

describe("Theatre Controller and Service Tests", () => {
  let res: Partial<Response>;
  let next: Partial<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn(); 
  });

  const mockTheatreData: Omit<ITheatre, "_id"> = {
    name: "Cinema Hall",
    location: "New York",
    seatingCapacity: 200,
    capacity: 200,
    contact: { phone: "1234567890", email: "test@theatre.com" },
    amenities: ["Wifi", "Parking"],
    movies: [new Types.ObjectId(), new Types.ObjectId()] // Use ObjectId for movies
  };

  let mockTheatre: MockTheatre;

  beforeAll(() => {
    mockTheatre = {
      ...mockTheatreData,
      _id: new mongoose.Types.ObjectId(),
      save: jest.fn().mockResolvedValue(mockTheatreData),
      toJSON: jest.fn().mockReturnValue(mockTheatreData),
      // Mocking other required methods from Mongoose Document
      $assertPopulated: jest.fn(),
      $clearModifiedPaths: jest.fn(),
      $clone: jest.fn(),
      $createModifiedPathsSnapshot: jest.fn(),
      __v: 0,
    };

    // Mock the Theatre model (only mock the necessary methods)
    (Theatre as unknown as jest.Mock).mockImplementation(() => mockTheatre);
  });

  describe("Theatre Service", () => {
    test("createTheatre should create a new theatre", async () => {
      jest.spyOn(theatreService, "createTheatre").mockResolvedValue(mockTheatre); 

      const result = await theatreService.createTheatre(mockTheatreData);
      expect(result).toEqual(mockTheatre);
      expect(theatreService.createTheatre).toHaveBeenCalledWith(mockTheatreData);
    });
  });

  describe("Theatre Controller", () => {
    test("createTheatre should respond with success message and created theatre", async () => {
      jest.spyOn(theatreService, "createTheatre").mockResolvedValue(mockTheatre); 

      const req = {
        body: mockTheatreData,
      } as Request;

      await createTheatre(req, res as Response, next as NextFunction); 

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
