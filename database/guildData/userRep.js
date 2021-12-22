const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	GuildID: String,
	UserID: String,
	GeneralRep: Number,
	TradeRep: Number,
})

const userRepModel = module.exports = mongoose.model("userRep", userSchema);