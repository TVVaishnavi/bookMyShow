import { RequestHandler } from "express";
import theatreService from "../service/theatre";
import { THEATRE_MESSAGES } from "../constant";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateTheatreDTO, UpdateTheatreDTO } from "../DTO/theatre.dto";

export const createTheatre: RequestHandler = async (req, res, next) => {
  try {
    const theatreData = plainToInstance(CreateTheatreDTO, req.body as Record<string, unknown>);
    const errors = await validate(theatreData);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const theatre = await theatreService.createTheatre(theatreData);
    res.status(201).json({ message: THEATRE_MESSAGES.CREATED, theatre });
  } catch (error) {
    next(error);
  }
};

export const getAllTheatres: RequestHandler = async (req, res, next) => {
  try {
    const theatres = await theatreService.getAllTheatres();
    res.status(200).json({ theatres });
  } catch (error) {
    next(error);
  }
};

export const getTheatreById: RequestHandler = async (req, res, next) => {
  try {
    const theatre = await theatreService.getTheatreById(req.params.id);
    if (!theatre) {
      res.status(404).json({ message: THEATRE_MESSAGES.NOT_FOUND });
      return;
    }
    res.status(200).json({ theatre });
  } catch (error) {
    next(error);
  }
};

export const updateTheatre: RequestHandler = async (req, res, next) => {
  try {
    const updateData = plainToInstance(UpdateTheatreDTO, req.body as Record<string, unknown>);
    const errors = await validate(updateData);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const theatre = await theatreService.updateTheatre(req.params.id, updateData);
    if (!theatre) {
      res.status(404).json({ message: THEATRE_MESSAGES.NOT_FOUND });
      return;
    }

    res.status(200).json({ message: THEATRE_MESSAGES.UPDATED, theatre });
  } catch (error) {
    next(error);
  }
};

export const deleteTheatre: RequestHandler = async (req, res, next) => {
  try {
    const theatre = await theatreService.deleteTheatre(req.params.id);
    if (!theatre) {
      res.status(404).json({ message: THEATRE_MESSAGES.NOT_FOUND });
      return;
    }
    res.status(202).json({ message: THEATRE_MESSAGES.DELETED });
  } catch (error) {
    next(error);
  }
};

export const searchTheatres: RequestHandler = async (req, res, next) => {
  try {
    const searchQuery = req.query.query as string | undefined;
    if (!searchQuery) {
      res.status(400).json({ message: "Search query is required." });
      return;
    }

    const theatres = await theatreService.searchTheatres(searchQuery);
    res.status(200).json({ theatres });
  } catch (error) {
    next(error);
  }
};

const theatreController = { createTheatre, getAllTheatres, getTheatreById, updateTheatre, deleteTheatre, searchTheatres };
export default theatreController;
