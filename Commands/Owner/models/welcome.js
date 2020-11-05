const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Welcome: {
    type: String,
  },
  WelcomeMsg: {
    type: String,
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('welcomer', PrefixSchema);
