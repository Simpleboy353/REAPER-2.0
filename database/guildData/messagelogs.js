const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID: String,
})
const messageModel = module.exports = mongoose.model('messagelogs', messageSchema);