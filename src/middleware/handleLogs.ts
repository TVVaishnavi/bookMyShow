import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import LogicModel from "../models/log";

interface LogEventParams {
    dateTime: any;
    id: any;
    method: any;
    origin: any;
    path: any;
}

const logEvent = async (method: string, origin: string, path: string): Promise<any> => {
    const dateTime: string = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const createNewLog:any= new LogicModel.LogicModel({
        dateTime: dateTime,
        id: uuid(),
        method: method,
        origin: origin,
        path: path
    });
    const saveLog = await createNewLog.save();
    return 
}

const logEvents = async (method: string, origin: string, path: string): Promise<void> => {
    try {
        const logEven = await logEvent(method, origin, path);
    } catch (err) {
        console.log(err);
    }
};

const logger = (req: any, res: any, next: () => void): void => {
    logEvents(req.method, req.headers.origin as string, req.path);
    console.log(`${req.method} ${req.path}`);
    next();
};

export { logger };