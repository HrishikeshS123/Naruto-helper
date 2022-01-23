const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: String,
  disabled: {
    mission: { default: false, type: Boolean },
    report: { default: false, type: Boolean },
    challenge: { default: false, type: Boolean },
    tower: { default: false, type: Boolean },
    adventure: { default: false, type: Boolean },
  },
  stats: {
    reminders: {
      mission: { default: 0, type: Number },
      report: { default: 0, type: Number },
      challenge: { default: 0, type: Number },
    },
  },
});

module.exports = new mongoose.model("user", UserSchema, "user");
