const Theatre = require("../model/theatre");

const createTheatre = async (theatreData) => {
    const theatre = new Theatre(theatreData);
    await theatre.save();
    return theatre;
};

const getAllTheatres = async() => {
    return await Theatre.find();
};

const getTheatreById = async(theatreId) => {
    return await Theatre.findById(theatreId);
};

const updateTheatre = async(theatreId, updateData) => {
    return await Theatre.findByIdAndUpdate(theatreId, updateData, { new: true });
};

const deleteTheatre = async(theatreId) => {
    return await Theatre.findByIdAndDelete(theatreId);
};

const searchTheatres = async(searchQuery) => {
    return await Theatre.find({
        $or: [
            { name: { $regex: searchQuery, $options: 'i' } }, 
            { location: { $regex: searchQuery, $options: 'i' } },
        ],
    });
};

module.exports = { createTheatre, getAllTheatres, getTheatreById, updateTheatre, deleteTheatre, searchTheatres };
