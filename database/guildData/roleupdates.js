const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID: String,
})
const roleModel = module.exports = mongoose.model('roleupdates', roleSchema);