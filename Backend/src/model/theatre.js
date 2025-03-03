const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const theatreSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  movies: [{ type: String, required: true }],
});

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
