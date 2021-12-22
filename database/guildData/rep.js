const mongoose = require("mongoose")

const repSchema = new mongoose.Schema({
	GuildID: String,
	ChannelID: String,
})

const repModel = module.exports = mongoose.model("rep", repSchema)
