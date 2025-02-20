import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import LogicModel from "../models/log";
import { DATE_FORMAT, LOG_KEYS } from "../constant"; 

export const logEvent = async (method: string, origin: string, path: string): Promise<void> => {
  const dateTime: string = format(new Date(), DATE_FORMAT);
  const newLog = new LogicModel({
    dateTime,
    id: uuid(),
    [LOG_KEYS.METHOD]: method,
    [LOG_KEYS.ORIGIN]: origin,
    [LOG_KEYS.PATH]: path,
  });
  await newLog.save();
};

const logEvents = async (method: string, origin: string, path: string): Promise<void> => {
  try {
    await logEvent(method, origin, path);
  } catch (err) {
    console.error(err);
  }
};

const logger = (req: any, res: any, next: () => void): void => {
  logEvents(req.method, req.headers.origin as string, req.path);
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logger };
