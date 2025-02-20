import mongoose from "mongoose";
import dotenv from "dotenv";
import { MONGODB } from "../constant";

dotenv.config();

if (!MONGODB.URI) {
  throw new Error(MONGODB.MESSAGES.MISSING_URI);
}

mongoose
  .connect(MONGODB.URI, MONGODB.OPTIONS)
  .then(() => {
    console.log(MONGODB.MESSAGES.CONNECTED);
  })
  .catch((err) => {
    console.error(`${MONGODB.MESSAGES.ERROR} ${err}`);
  });

mongoose.connection.on("error", (err) => {
  console.error(`${MONGODB.MESSAGES.ERROR} ${err}`);
});

export default mongoose;
