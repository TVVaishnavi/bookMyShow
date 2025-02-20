import { Request, Response } from "express";
import theatreService from "../service/theatre";
import { THEATRE_MESSAGES } from "../constant";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateTheatreDTO, UpdateTheatreDTO } from "../DTO/theatre.dto";

const createTheatre = async (req: Request, res: Response): Promise<Response> => {
    try {
        const theatreData = plainToInstance(CreateTheatreDTO, req.body);
        const errors = await validate(theatreData);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const theatre = await theatreService.createTheatre(theatreData);
        return res.status(201).json({ message: THEATRE_MESSAGES.CREATED, theatre });
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
};

const getAllTheatres = async (req: Request, res: Response): Promise<Response> => {
    try {
        const theatres = await theatreService.getAllTheatres();
        return res.status(200).json({ theatres });
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
};

const getTheatreById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const theatre = await theatreService.getTheatreById(req.params.id);
        if (!theatre) {
            return res.status(404).json({ message: THEATRE_MESSAGES.NOT_FOUND });
        }
        return res.status(200).json({ theatre });
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
};

const updateTheatre = async (req: Request, res: Response): Promise<Response> => {
    try {
        const updateData = plainToInstance(UpdateTheatreDTO, req.body);
        const errors = await validate(updateData);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const theatre = await theatreService.updateTheatre(req.params.id, updateData);
        if (!theatre) {
            return res.status(404).json({ message: THEATRE_MESSAGES.NOT_FOUND });
        }
        return res.status(200).json({ message: THEATRE_MESSAGES.UPDATED });
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
};

const deleteTheatre = async (req: Request, res: Response): Promise<Response> => {
    try {
        const theatre = await theatreService.deleteTheatre(req.params.id);
        if (!theatre) {
            return res.status(404).json({ message: THEATRE_MESSAGES.NOT_FOUND });
        }
        return res.status(202).json({ message: THEATRE_MESSAGES.DELETED });
    } catch (error) {
        return res.status(400).json({ message: THEATRE_MESSAGES.DELETE_ERROR });
    }
};

const searchTheatres = async (req: Request, res: Response): Promise<Response> => {
    try {
        const searchQuery = req.query.query as string;
        const theatres = await theatreService.searchTheatres(searchQuery);
        return res.status(200).json({ theatres });
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
};

const theatreController = { createTheatre, getAllTheatres, getTheatreById, updateTheatre, deleteTheatre, searchTheatres };
export default theatreController;
