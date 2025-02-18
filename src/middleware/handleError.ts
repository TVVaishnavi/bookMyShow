import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {ErrorModel} from "../models/log";

interface ErrorProps {
    errName: string;
    errMessage: string;
}

const error = async (errName: string, errMessage: string): Promise<any> => {
    const dateTime: string = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const createNewError = new ErrorModel({
        dateTime: dateTime,
        id: uuid(),
        errName: errName,
        errMessage: errMessage
    });
    const saveError = await createNewError.save();
    return saveError;
};

const errEvents = async (name: string, message: string): Promise<void> => {
    try {
        const errEvent = await error(name, message);
    } catch (err) {
        console.log(err);
    }
};

const blocker = (err: any, req: any, res: any, next: Function): void => {
    errEvents(err.name, err.message);
    console.log(`${err.name} ${err.message}`);
    next();
};

export { blocker };