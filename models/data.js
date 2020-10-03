const mongoose = module.require("mongoose");

const dataScheama = mongoose.Schema({
    id: String,
    Money: Number,
    guildID: String,
    daily: String,
    prefix: '=',
})e

module.exports = mongoose.model("data",dataScheama)
