const mongoose = require("../config/dbconfig")


const logicSchema = new mongoose.Schema({
        dateTime : String,
        id : String,
        method : String,
        origin : String,
        path : String
})

const handleErrorSchema = new mongoose.Schema({
        dateTime : String,
        id : String,
        errName : String,
        errMessage : String
})

module.exports = mongoose.model("logs","errorlog", logicSchema, handleErrorSchema )

