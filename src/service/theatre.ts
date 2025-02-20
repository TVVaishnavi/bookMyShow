import Theatre, { ITheatre } from "../models/theatre";
import { THEATRE,SEARCH_FIELDS } from "../constant"; 
import { HydratedDocument } from "mongoose";
import { plainToInstance } from "class-transformer";
import { validate} from "class-validator";
import { CreateTheatreDTO, UpdateTheatreDTO } from "../DTO/theatre.dto";

const createTheatre = async(theatreData: CreateTheatreDTO): Promise<HydratedDocument<ITheatre>>=>{
  try {
    const ValidatedData = plainToInstance(CreateTheatreDTO, theatreData);
    const errors = await validate(ValidatedData);
    if(errors.length>0) throw new Error("validation failed");
    const theatre = new Theatre(ValidatedData);
    await theatre.save();
    return theatre;
  } catch (error) {
    throw new Error(`${THEATRE.CREATE_ERROR}: ${(error as Error).message}`)
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
  updateData: UpdateTheatreDTO
): Promise<HydratedDocument<ITheatre> | null> => {
  try {
    const validatedData = plainToInstance(UpdateTheatreDTO, updateData);
    const errors = await validate(validatedData);
    if (errors.length > 0) throw new Error("Validation failed");

    const updatedTheatre = await Theatre.findByIdAndUpdate(theatreId, validatedData, { new: true }).exec();
    if (!updatedTheatre) throw new Error(THEATRE.UPDATE_ERROR);
    return updatedTheatre;
  } catch (error) {
    throw new Error(`${THEATRE.UPDATE_ERROR}: ${(error as Error).message}`);
  }
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
    console.log(error)
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
