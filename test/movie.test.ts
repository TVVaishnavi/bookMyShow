import { Request, Response } from "express";
import { Document, Types } from "mongoose"; // Import Mongoose's Document and Types
import {
  createMovieController,
  getMovieByIdController,
  getMoviesController,
  searchMovies,
} from "../src/controller/movie";

import {
  createMovie,
  getMovieById,
  getMovies,
} from "../src/service/movie";

import { IMovie } from "../src/models/movie"; // ✅ Ensure correct import
import { HTTP_CODE, MOVIE_RESPONSES } from "../src/constant";

// Mock movie service functions
jest.mock("../src/service/movie");

// ✅ Function to create a mock Mongoose movie document
const createMockMovieDocument = (data: Partial<IMovie>): Document & IMovie => {
  return {
    _id: new Types.ObjectId(),
    ...data,
  } as Document & IMovie;
};

describe("Movie Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createMovieController", () => {
    it("should add a new entry successfully", async () => {
      req.body = {
        title: "Movie Title",
        genre: "Action",
        director: "Director",
        description: "A great movie",
        releaseDate: "2025-02-20",
        duration: 120,
        language: "English",
      };

      const newMovie = createMockMovieDocument(req.body);

      (createMovie as jest.MockedFunction<typeof createMovie>).mockResolvedValue(newMovie);

      await createMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        feedback: MOVIE_RESPONSES.CREATED,
        details: newMovie,
      });
    });

    it("should return failure if addition is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.FETCH_FAIL);
      (createMovie as jest.MockedFunction<typeof createMovie>).mockRejectedValue(failure);

      await createMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: failure.message });
    });
  });

  describe("getMovieByIdController", () => {
    it("should retrieve details by ID", async () => {
      req.params = { movieId: "123" };

      const movie = createMockMovieDocument({ _id: "123", title: "Movie Title" });

      (getMovieById as jest.MockedFunction<typeof getMovieById>).mockResolvedValue(movie);

      await getMovieByIdController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({ details: movie });
    });

    it("should return failure if retrieval is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.NOT_FOUND);
      (getMovieById as jest.MockedFunction<typeof getMovieById>).mockRejectedValue(failure);

      await getMovieByIdController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: failure.message });
    });
  });

  describe("getMoviesController", () => {
    it("should return a list of entries", async () => {
      req.query = { genre: "Action" };
      const movies = [
        createMockMovieDocument({ title: "Movie 1" }),
        createMockMovieDocument({ title: "Movie 2" }),
      ];

      (getMovies as jest.MockedFunction<typeof getMovies>).mockResolvedValue(movies);

      await getMoviesController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({ details: movies });
    });

    it("should return failure if retrieval is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.FETCH_FAIL);
      (getMovies as jest.MockedFunction<typeof getMovies>).mockRejectedValue(failure);

      await getMoviesController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: failure.message });
    });
  });

  describe("searchMovies", () => {
    it("should return entries matching criteria", async () => {
      req.query = { title: "Movie", genre: "Action" };
      const movies = [
        createMockMovieDocument({ title: "Movie 1", genre: "Action" }),
      ];

      (getMovies as jest.MockedFunction<typeof getMovies>).mockResolvedValue(movies);

      await searchMovies(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({ details: movies });
    });

    it("should return failure if search is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.SEARCH_FAIL);
      (getMovies as jest.MockedFunction<typeof getMovies>).mockRejectedValue(failure);

      await searchMovies(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: MOVIE_RESPONSES.SEARCH_FAIL });
    });
  });
});
