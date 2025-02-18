import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri: string | undefined = process.env.MONGODB_URI;

if (!mongoUri) {
    throw new Error("Missing MONGODB_URI in environment variables");
}

mongoose
  .connect(mongoUri, {
    tls: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
  });

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

export default mongoose;
