import mongoose, { Schema, Document } from 'mongoose';

interface LogicLog extends Document {
  dateTime: string;
  id: string;
  method: string;
  origin: string;
  path: string;
}

interface ErrorLog extends Document {
  dateTime: string;
  id: string;
  errName: string;
  errMessage: string;
}

const logicSchema: Schema<LogicLog> = new Schema({
  dateTime: String,
  id: String,
  method: String,
  origin: String,
  path: String
});

const handleErrorSchema: Schema<ErrorLog> = new Schema({
  dateTime: String,
  id: String,
  errName: String,
  errMessage: String
});

const LogicModel = mongoose.model<LogicLog>("logs", logicSchema);
const ErrorModel = mongoose.model<ErrorLog>("errorlog", handleErrorSchema);
export {ErrorModel}
export default LogicModel