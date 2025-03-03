const {
    createTheatre,
    getTheatres,
    getTheatresByMovieName,
    getMoviesInTheatre,
    updateTheatre,
    deleteTheatre,
    bookSeatThroughTheatre, searchTheatres
  } = require("../service/theatre");
  const searchTheatresController = async(req, res)=>{
    try {
      const theatres = await searchTheatres(req.body)
      if(theatres.length === 0){
        return res.status(404).json({message: "No theatres found"})
      }
      res.json(theatres)
    } catch (error) {
      res.status(500).json({error: "Internal server Error"})
    }
  }
  // ✅ Admin: Create a new theatre
  const createTheatreController = async (req, res) => {
    try {
      const theatre = await createTheatre(req.body);
      res.status(201).json({ message: "Theatre created successfully", theatre });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ✅ Get all theatres (with optional query filters)
  const getTheatresController = async (req, res) => {
    try {
      const theatres = await getTheatres(req.query);
      res.status(200).json({ theatres });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ✅ Get a specific theatre by ID


  const getTheatresByMovieController = async (req, res) => {
    try {
      const { movieName } = req.params; // Get movie name from request params
      const theatres = await getTheatresByMovieName(movieName); // Fetch theatres
      res.status(200).json({ theatres }); // Return theatres in JSON format
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  
  // ✅ Get movies in a specific theatre
  const getMoviesInTheatreController = async (req, res) => {
    try {
      const movies = await getMoviesInTheatre(req.params.theatreName);
      res.status(200).json({ movies });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ✅ Admin: Update theatre details
  const updateTheatreController = async (req, res) => {
    try {
      const updatedTheatre = await updateTheatre(req.params.id, req.body);
      res.status(200).json({ message: "Theatre updated successfully", theatre: updatedTheatre });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ✅ Admin: Delete a theatre
  const deleteTheatreController = async (req, res) => {
    try {
      await deleteTheatre(req.params.id);
      res.status(200).json({ message: "Theatre deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ✅ Book a seat in a theatre for a movie
  const bookSeatThroughTheatreController = async (req, res) => {
    try {
      const { theatreName, movieName, seatNumber } = req.body;
      const result = await bookSeatThroughTheatre(theatreName, movieName, seatNumber);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    createTheatreController,
    getTheatresController,
    getTheatresByMovieController,
    getMoviesInTheatreController,
    updateTheatreController,
    deleteTheatreController,
    bookSeatThroughTheatreController, searchTheatresController
  };
  