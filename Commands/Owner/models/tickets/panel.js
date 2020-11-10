const mongoose = require("mongoose");
const panelModel = mongoose.model(
  "panel",
  new mongoose.Schema({
    guild: String,
    msg: String,
  })
);
module.exports = panelModel;