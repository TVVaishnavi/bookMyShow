const express = require("express");
const app=express();
require("dotenv").config();
require("../src/config/database");
app.use(express.json());
const userRouter = require("./routes/user");
const movieRoute = require("../src/routes/movie");
const theatreRoutes = require('./routes/theatre');
const startSeatReleaseJob = require("./releaseSeat");
const PORT = process.env.PORT||3800;

app.get("/",(req,res)=>{
    res.status(200).json({message: "server is running"});
});

if(require.main === module){
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
};
app.use("/", userRouter);
app.use("/api", movieRoute);
app.use("/api/theatres", theatreRoutes);

startSeatReleaseJob();

module.exports = app;