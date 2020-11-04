const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Welcome: {
    type: String,
  },
  WelcomeMsg: String,
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('welcomer', PrefixSchema);
