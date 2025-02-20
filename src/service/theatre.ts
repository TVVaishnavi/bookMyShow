import Theatre, { ITheatre } from "../models/theatre";
import { THEATRE, MONGO_OPTIONS, SEARCH_FIELDS } from "../constant"; 
import { Document, Model, HydratedDocument } from "mongoose";

interface TheatreData {
  name: string;
  location: string;
}

const createTheatre = async (theatreData: TheatreData): Promise<HydratedDocument<ITheatre>> => {
  try {
    const theatre = new Theatre(theatreData);
    await theatre.save();
    return theatre;
  } catch (error) {
    throw new Error(THEATRE.CREATE_ERROR);
  }
};

const getAllTheatres = async (): Promise<HydratedDocument<ITheatre>[]> => {
  return await Theatre.find().exec();
};

const getTheatreById = async (theatreId: string): Promise<HydratedDocument<ITheatre> | null> => {
  const theatre = await Theatre.findById(theatreId).exec();
  if (!theatre) throw new Error(THEATRE.NOT_FOUND);
  return theatre;
};

const updateTheatre = async (
  theatreId: string,
  updateData: Partial<TheatreData>
): Promise<HydratedDocument<ITheatre> | null> => {
  const updatedTheatre = await Theatre.findByIdAndUpdate(theatreId, updateData, { new: true }).exec();
  if (!updatedTheatre) throw new Error(THEATRE.UPDATE_ERROR);
  return updatedTheatre;
};

const deleteTheatre = async (theatreId: string): Promise<HydratedDocument<ITheatre> | null> => {
  const deletedTheatre = await Theatre.findByIdAndDelete(theatreId).exec();
  if (!deletedTheatre) throw new Error(THEATRE.DELETE_ERROR);
  return deletedTheatre;
};

const searchTheatres = async (searchQuery: string): Promise<HydratedDocument<ITheatre>[]> => {
  try {
    return await Theatre.find({
      $or: SEARCH_FIELDS.map(field => ({ [field]: { $regex: searchQuery, $options: "i" } })),
    }).exec();
  } catch (error) {
    throw new Error(THEATRE.SEARCH_ERROR);
  }
};

const theatreService = {
  createTheatre,
  getAllTheatres,
  getTheatreById,
  updateTheatre,
  deleteTheatre,
  searchTheatres,
};

export default theatreService;
