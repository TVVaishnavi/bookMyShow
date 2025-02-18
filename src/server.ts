import express from "express";
import mongoose from "../src/config/database"; 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Server with MongoDB!");
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is open. Starting server...");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});


