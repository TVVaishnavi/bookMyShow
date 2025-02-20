import { Request, Response } from "express";
import theatreService from "../service/theatre";
import { THEATRE_MESSAGES } from "../constant";

const createTheatre = async (req: Request, res: Response): Promise<void> => {
    try {
        const theatre = await theatreService.createTheatre(req.body);
        res.status(201).json({ message: THEATRE_MESSAGES.CREATED, theatre });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const getAllTheatres = async (req: Request, res: Response): Promise<void> => {
    try {
        const theatres = await theatreService.getAllTheatres();
        res.status(200).json({ theatres });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const getTheatreById = async (req: Request, res: Response): Promise<void> => {
    try {
        const theatre = await theatreService.getTheatreById(req.params.id);
        if (!theatre) {
            res.status(404).json({ message: THEATRE_MESSAGES.NOT_FOUND });
        } else {
            res.status(200).json({ theatre });
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const updateTheatre = async (req: Request, res: Response): Promise<void> => {
    try {
        const theatre = await theatreService.updateTheatre(req.params.id, req.body);
        if (!theatre) {
            res.status(404).json({ message: THEATRE_MESSAGES.NOT_FOUND });
        } else {
            res.status(200).json({ message: THEATRE_MESSAGES.UPDATED });
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const deleteTheatre = async (req: Request, res: Response): Promise<void> => {
    try {
        const theatre = await theatreService.deleteTheatre(req.params.id);
        if (!theatre) {
            res.status(404).json({ message: THEATRE_MESSAGES.NOT_FOUND });
        } else {
            res.status(202).json({ message: THEATRE_MESSAGES.DELETED });
        }
    } catch (error) {
        res.status(400).json({ message: THEATRE_MESSAGES.DELETE_ERROR });
    }
};

const searchTheatres = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchQuery = req.query.query as string;
        const theatres = await theatreService.searchTheatres(searchQuery);
        res.status(200).json({ theatres });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const theatreController = { getAllTheatres, getTheatreById, updateTheatre, deleteTheatre, searchTheatres };
export default { theatreController, createTheatre, getAllTheatres, getTheatreById, updateTheatre, deleteTheatre, searchTheatres };
export { createTheatre };
