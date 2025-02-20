import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { ErrorModel } from "../models/log";
import { DATE_FORMAT } from "../constant"; 
import { NextFunction } from "express";


const error = async (errName: string, errMessage: string): Promise<void> => {
  const dateTime: string = format(new Date(), DATE_FORMAT); 
};

const errEvents = async (name: string, message: string): Promise<void> => {
  try {
    await error(name, message);
  } catch (err) {
    console.log(err);
  }
};

const blocker = (err: any, req: Request, _res: Response, next: NextFunction): void => {
  errEvents(err.name, err.message);
  console.log(`${err.name} ${err.message}`);
  next();
}

export { blocker };
