const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Message: {
    type: String
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('messages', PrefixSchema);
