const mongoose = require("mongoose");

const RemindSchema = new mongoose.Schema({
  userId: String,
  tower: Number,
  adventure: Number,
});

module.exports = new mongoose.model("reminders", RemindSchema);
