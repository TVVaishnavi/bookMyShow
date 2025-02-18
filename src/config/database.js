const mongoose = require("mongoose");
require('dotenv').config();

// Ensure that the MongoDB URI is correct
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
    tls: true,  
    serverSelectionTimeoutMS: 5000,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`);
});

module.exports = mongoose;
