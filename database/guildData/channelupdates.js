const mongoose = require('mongoose');
const channelSchema = new mongoose.Schema({
    ChannelID: String,
    GuildID: String
})
const channelModel = module.exports = mongoose.model('channelupdates', channelSchema);