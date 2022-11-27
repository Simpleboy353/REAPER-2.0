const mongoose = require("mongoose");

const suggestSchema = new mongoose.Schema({
	GuildID: String,
	SuggestChannel: String,
	Suggestion: String,
	MsgID: String,
	Suggester: String,
});

const SuggestModel = module.exports = mongoose.model("suggest", suggestSchema);