const mongoose = require('mongoose')

const antilinkSchema = new mongoose.Schema({
    GuildID: String,
});

const antilinkModel = module.exports = new mongoose.model('antilink', antilinkSchema)
