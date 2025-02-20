import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
   
  title: string;
  description: string;
  genre: string;
  releaseDate: Date; // Ensure it's Date (not string)
  director: string;
  cast: string[];
  rating?: number;
  duration: number;
  language: string;
  createdAt?: Date;
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true }, // Ensure Date type
  director: { type: String, required: true },
  cast: [{ type: String }],
  rating: { type: Number, min: 0, max: 10 },
  duration: { type: Number, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model<IMovie>('Movie', movieSchema);
export default Movie;
