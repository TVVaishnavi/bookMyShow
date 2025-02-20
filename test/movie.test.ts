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

import { HTTP_CODE, MOVIE_RESPONSES } from "../src/constant";

jest.mock("../src/service/movie");

describe("Movie Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: {}, body: {}, query: {} } as Partial<Request>;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
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

      const newMovie = { ...req.body, _id: new mongoose.Types.ObjectId() };
      (createMovie as jest.Mock).mockResolvedValue(newMovie);

      await createMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        feedback: MOVIE_RESPONSES.CREATED,
        details: newMovie,
      });
    });

    it("should return failure if addition is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.FETCH_FAIL);
      (createMovie as jest.Mock).mockRejectedValue(failure);

      await createMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: failure.message });
    });
  });

  describe("updateMovieController", () => {
    it("should modify an entry successfully", async () => {
      req.params = { movieId: "123" };
      req.body = { title: "Updated Movie Title" };

      const updatedMovie = { ...req.body, _id: "123" };
      (updateMovie as jest.Mock).mockResolvedValue(updatedMovie);

      await updateMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        feedback: MOVIE_RESPONSES.UPDATED,
        details: updatedMovie,
      });
    });

    it("should return failure if modification is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.FETCH_FAIL);
      (updateMovie as jest.Mock).mockRejectedValue(failure);

      await updateMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: failure.message });
    });
  });

  describe("deleteMovieController", () => {
    it("should erase an entry successfully", async () => {
      req.params = { movieId: "123" };
      (deleteMovie as jest.Mock).mockResolvedValue(null);

      await deleteMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        feedback: MOVIE_RESPONSES.REMOVED,
      });
    });

    it("should return failure if removal is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.FETCH_FAIL);
      (deleteMovie as jest.Mock).mockRejectedValue(failure);

      await deleteMovieController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: failure.message });
    });
  });

  describe("getMovieByIdController", () => {
    it("should retrieve details by ID", async () => {
      req.params = { movieId: "123" };
      const movie = { _id: "123", title: "Movie Title" };
      (getMovieById as jest.Mock).mockResolvedValue(movie);

      await getMovieByIdController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({ details: movie });
    });

    it("should return failure if retrieval is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.NOT_FOUND);
      (getMovieById as jest.Mock).mockRejectedValue(failure);

      await getMovieByIdController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: failure.message });
    });
  });

  describe("getMoviesController", () => {
    it("should return a list of entries", async () => {
      req.query = { genre: "Action" };
      const movies = [{ title: "Movie 1" }, { title: "Movie 2" }];
      (getMovies as jest.Mock).mockResolvedValue(movies);

      await getMoviesController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({ details: movies });
    });

    it("should return failure if retrieval is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.FETCH_FAIL);
      (getMovies as jest.Mock).mockRejectedValue(failure);

      await getMoviesController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: failure.message });
    });
  });

  describe("searchMovies", () => {
    it("should return entries matching criteria", async () => {
      req.query = { title: "Movie", genre: "Action" };
      const movies = [{ title: "Movie 1", genre: "Action" }];
      (getMovies as jest.Mock).mockResolvedValue(movies);

      await searchMovies(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({ details: movies });
    });

    it("should return failure if search is unsuccessful", async () => {
      const failure = new Error(MOVIE_RESPONSES.SEARCH_FAIL);
      (getMovies as jest.Mock).mockRejectedValue(failure);

      await searchMovies(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(HTTP_CODE.FAILURE);
      expect(res.json).toHaveBeenCalledWith({ feedback: MOVIE_RESPONSES.SEARCH_FAIL });
    });
  });
});
