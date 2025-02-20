import mongoose, { Document, Schema } from 'mongoose';

interface IContact {
  phone: string;
  email: string;
}

export interface ITheatre extends Document {
  name: string;
  location: string;
  seatingCapacity: number;
  movies: mongoose.Types.ObjectId[];
  contact: IContact;
  amenities?: string[];
}

const theatreSchema: Schema<ITheatre> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', 
      },
    ],
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
      },
    },
    amenities: {
      type: [String], 
    },
  },
  { timestamps: true }
);

const Theatre = mongoose.model<ITheatre>('Theatre', theatreSchema);

export default Theatre; 