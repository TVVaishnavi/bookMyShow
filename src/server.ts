import express from "express";
import mongoose from "../src/config/database";
import { PORT, API_ROUTES, MONGO_MESSAGES } from "../src/constant";
import userRoute from "../src/routes/user";
import movieRoute from "../src/routes/movie";
import theatreRoute from "../src/routes/theatre";
import startSeatReleaseJob from "../src/releaseSeat";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Server with MongoDB!");
});

app.use(API_ROUTES.USER, userRoute);
app.use(API_ROUTES.MOVIE, movieRoute);
app.use(API_ROUTES.THEATRE, theatreRoute);

startSeatReleaseJob();

mongoose.connection.once("open", () => {
  console.log(MONGO_MESSAGES.CONNECTED);
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error(`${MONGO_MESSAGES.ERROR} ${err}`);
});
