const express = require("express")
const app=express()
require("dotenv").config();
require("../src/config/database")
app.use(express.json())
const userRouter = require("./routes/user")
const movieRoute = require("../src/routes/movie")
const ticketRoute = require("./routes/ticket")
const createAdminAccount = require("../src/admin")
const PORT = process.env.PORT||3800

app.get("/",(req,res)=>{
    res.status(200).json({message: "server is running"})
})

if(require.main === module){
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
}
app.use("/", userRouter)
app.use("/api", movieRoute,ticketRoute)
createAdminAccount()

module.exports = app