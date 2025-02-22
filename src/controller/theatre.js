const theatreService = require("../service/theatre")

const createTheatre = async(req, res)=>{
    try {
        const theatre = await theatreService.createTheatre(req.body)
        res.status(201).json({message: 'Theatre created successfully', theatre})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAllTheatres = async(req, res)=>{
    try {
        const theatres = await theatreService.getAllTheatres()
        res.status(200).json({theatres})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getTheatreById = async(req, res)=>{
    try {
        const theatre = await theatreService.getTheatreById(req.params.id)
        if(!theatre){
            return res.status(404).json({message: 'Theatre not found'})
        }
        res.status(200).json({theatre})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const updateTheatre = async(req, res)=>{
    try {
        const theatre = await theatreService.updateTheatre(req.params.id, req.body)
        if(!theatre){
            return res.status(404).json({message: 'Theatre not found'})
        }
        res.status(200).json({message: 'Theatre updated successfully'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const deleteTheatre = async(req, res)=>{
    try {
        const theatre = await theatreService.deleteTheatre(req.params.id)
        if(!theatre){
            return res.status(404).json({message: 'Theatre not found'})
        }
        res.status(202).json({message: 'Theatre deleted successfully'})
    } catch (error) {
        res.status(400).json({message: 'Theatre deleted successfully'})
    }
}

const searchTheatres = async(req, res)=>{
    try {
        const searchQuery = req.body.name || req.query.query
        const theatres = await theatreService.searchTheatres(searchQuery)
        res.status(200).json({theatres})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {createTheatre, getAllTheatres, getTheatreById, updateTheatre, deleteTheatre, searchTheatres}
