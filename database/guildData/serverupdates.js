const mongoose = require('mongoose');
const guildSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID: String,
})
const guildModel = module.exports = mongoose.model('guildupdates', guildSchema);