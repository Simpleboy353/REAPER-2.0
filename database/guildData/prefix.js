const mongoose = require("mongoose")

const prefixSchema = new mongoose.Schema({
Prefix: String,
GuildID: String,
});

const prefixModel = module.exports = mongoose.model("prefix", prefixSchema)
