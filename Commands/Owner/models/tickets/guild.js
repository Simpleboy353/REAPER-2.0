const mongoose = require("mongoose");
const guildModel = mongoose.model(
  "Guild",
  new mongoose.Schema({
    Guild: String,
    tickets: { type: Number, default: 0 },
  })
);
module.exports = guildModel;