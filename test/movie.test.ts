import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  createMovieController,
  updateMovieController,
  deleteMovieController,
  getMovieByIdController,
  getMoviesController,
  searchMovies,
} from "../src/controller/movie";

import {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  getMovies,
} from "../src/service/movie";

jest.mock("../src/service/movie");

describe("Movie Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: {}, body: {}, query: {} } as Partial<Request>;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>; // Fixed semicolon issue here
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createMovieController", () => {
    it("should create a new movie successfully", async () => {
      req.body = {
        title: "Movie Title",
        genre: "Action",
        director: "Director",
        description: "A great movie",
        releaseDate: "2025-02-20",
        duration: 120,
        language: "English",
      };

      const newMovie = { ...req.body, _id: new mongoose.Types.ObjectId() };
      (createMovie as jest.Mock).mockResolvedValue(newMovie);

      await createMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Movie created successfully",
        movie: newMovie,
      });
    });

    it("should return an error if movie creation fails", async () => {
      const error = new Error("Error creating movie");
      (createMovie as jest.Mock).mockRejectedValue(error);

      await createMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe("updateMovieController", () => {
    it("should update a movie successfully", async () => {
      req.params = { movieId: "123" };
      req.body = { title: "Updated Movie Title" };

      const updatedMovie = { ...req.body, _id: "123" };
      (updateMovie as jest.Mock).mockResolvedValue(updatedMovie);

      await updateMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Movie updated successfully",
        movie: updatedMovie,
      });
    });

    it("should return an error if movie update fails", async () => {
      const error = new Error("Error updating movie");
      (updateMovie as jest.Mock).mockRejectedValue(error);

      await updateMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe("deleteMovieController", () => {
    it("should delete a movie successfully", async () => {
      req.params = { movieId: "123" };
      (deleteMovie as jest.Mock).mockResolvedValue(null);

      await deleteMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Movie deleted successfully",
      });
    });

    it("should return an error if movie deletion fails", async () => {
      const error = new Error("Error deleting movie");
      (deleteMovie as jest.Mock).mockRejectedValue(error);

      await deleteMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe("getMovieByIdController", () => {
    it("should return a movie by ID", async () => {
      req.params = { movieId: "123" };
      const movie = { _id: "123", title: "Movie Title" };
      (getMovieById as jest.Mock).mockResolvedValue(movie);

      await getMovieByIdController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ movie });
    });

    it("should return an error if movie fetch fails", async () => {
      const error = new Error("Movie not found");
      (getMovieById as jest.Mock).mockRejectedValue(error);

      await getMovieByIdController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe("getMoviesController", () => {
    it("should return a list of movies", async () => {
      req.query = { genre: "Action" };
      const movies = [{ title: "Movie 1" }, { title: "Movie 2" }];
      (getMovies as jest.Mock).mockResolvedValue(movies);

      await getMoviesController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ movies });
    });

    it("should return an error if movies fetch fails", async () => {
      const error = new Error("Error fetching movies");
      (getMovies as jest.Mock).mockRejectedValue(error);

      await getMoviesController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe("searchMovies", () => {
    it("should return movies matching the search criteria", async () => {
      req.query = { title: "Movie", genre: "Action" };
      const movies = [{ title: "Movie 1", genre: "Action" }];
      (getMovies as jest.Mock).mockResolvedValue(movies);

      await searchMovies(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ movies });
    });

    it("should return an error if search fails", async () => {
      const error = new Error("Error searching movies");
      (getMovies as jest.Mock).mockRejectedValue(error);

      await searchMovies(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error searching movies" });
    });
  });
});
