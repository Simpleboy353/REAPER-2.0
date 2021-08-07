const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID: String,
})
const memberModel = module.exports = mongoose.model('memberupdates', memberSchema);