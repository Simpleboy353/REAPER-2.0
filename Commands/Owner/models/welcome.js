const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Welcome: {
    type: Number,
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('welcomer', PrefixSchema);
