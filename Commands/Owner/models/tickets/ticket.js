const mongoose = require("mongoose");
const ticketModel = mongoose.model(
  "ticket",
  new mongoose.Schema({
    guild: String,
    msg: String,
    owner: String,
    channelID: String,
    status: { type: Boolean, default: true },
  })
);
module.exports = ticketModel;
