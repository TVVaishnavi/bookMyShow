const mongoose = require("mongoose")
const {
    createMovieController,
    updateMovieController,
    deleteMovieController,
    getMovieByIdController,
    getMoviesController,
    searchMovies
  } = require("../src/controller/movie")
  
  const { createMovie, updateMovie, deleteMovie, getMovieById, getMovies } = require("../src/service/movie")
  
  jest.mock("../src/service/movie")
  
  describe("Movie Controller", () => {
    let req, res
  
    beforeEach(() => {
      req = { params: {}, body: {}, query: {} }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }
    })
  
    afterEach(() => {
      jest.clearAllMocks()
    })
  
    describe("createMovieController", () => {
      it("should create a new movie successfully", async () => {
        req.body = { title: "Movie Title", genre: "Action", director: "Director", description: "A great movie", releaseDate: "2025-02-20", duration: 120, language: "English" }
        const newMovie = { ...req.body, _id: "123" }
        createMovie.mockResolvedValue(newMovie)
  
        await createMovieController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ message: "movie created successfully", movie: newMovie })
      })
  
      it("should return an error if movie creation fails", async () => {
        const error = new Error("Error creating movie")
        createMovie.mockRejectedValue(error) 
  
        await createMovieController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: error.message })
      })
    })
  
    describe("updateMovieController", () => {
      it("should update a movie successfully", async () => {
        req.params.movieId = "123"
        req.body = { title: "Updated Movie Title" }
        const updatedMovie = { ...req.body, _id: "123" }
        updateMovie.mockResolvedValue(updatedMovie) 
  
        await updateMovieController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "movie updated successfully", movie: updatedMovie })
      })
  
      it("should return an error if movie update fails", async () => {
        const error = new Error("Error updating movie")
        updateMovie.mockRejectedValue(error) 
  
        await updateMovieController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: error.message })
      })
    })
  
    describe("deleteMovieController", () => {
      it("should delete a movie successfully", async () => {
        req.params.movieId = "123"
        deleteMovie.mockResolvedValue() 
  
        await deleteMovieController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "Movie deleted successfully" })
      })
  
      it("should return an error if movie deletion fails", async () => {
        const error = new Error("Error deleting movie")
        deleteMovie.mockRejectedValue(error) 
  
        await deleteMovieController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: error.message })
      })
    })
  
    describe("getMovieByIdController", () => {
      it("should return a movie by ID", async () => {
        req.params.movieId = "123"
        const movie = { _id: "123", title: "Movie Title" }
        getMovieById.mockResolvedValue(movie) 
  
        await getMovieByIdController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ movie })
      })
  
      it("should return an error if movie fetch fails", async () => {
        const error = new Error("Movie not found")
        getMovieById.mockRejectedValue(error) 
  
        await getMovieByIdController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: error.message })
      })
    })
  
    describe("getMoviesController", () => {
      it("should return a list of movies", async () => {
        req.query = { genre: "Action" }
        const movies = [{ title: "Movie 1" }, { title: "Movie 2" }]
        getMovies.mockResolvedValue(movies) 
  
        await getMoviesController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ movies })
      })
  
      it("should return an error if movies fetch fails", async () => {
        const error = new Error("Error fetching movies")
        getMovies.mockRejectedValue(error) 
  
        await getMoviesController(req, res)
  
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: error.message })
      })
    })
  
    describe("searchMovies", () => {
      it("should return movies matching the search criteria", async () => {
        req.query = { title: "Movie", genre: "Action" }
        const movies = [{ title: "Movie 1", genre: "Action" }]
        getMovies.mockResolvedValue(movies) 
  
        await searchMovies(req, res)
  
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ movies })
      })
  
      it("should return an error if search fails", async () => {
        const error = new Error("Error searching movies")
        getMovies.mockRejectedValue(error) 
  
        await searchMovies(req, res)
  
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: "Error searching movies" })
      })
    })
  })
  