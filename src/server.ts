import express from "express";
import mongoose from "../src/config/database"; 
const app = express();
const PORT = process.env.PORT || 3000;
import userRoute from "../src/routes/user";
import movieRoute from "../src/routes/movie";
import theatreRoute from "../src/routes/theatre";
import startSeatReleaseJob from "../src/releaseSeat";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Server with MongoDB!");
});

app.use('/', userRoute);
app.use('/api', movieRoute);
app.use('/api/theatre', theatreRoute);

startSeatReleaseJob();
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is open. Starting server...");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});


