const mongoose = require("mongoose");

const RemindSchema = new mongoose.Schema({
  userId: String,
  tower: Number,
  adventure: Number,
  reminded: {
    tower: { type: Boolean, default: false },
    adventure: { type: Boolean, default: false },
  },
});

module.exports = new mongoose.model("reminders", RemindSchema);
