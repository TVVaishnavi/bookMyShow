import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

export default mongoose;
