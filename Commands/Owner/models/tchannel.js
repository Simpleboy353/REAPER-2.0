const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Channel: {
    type: String
  },
  UserID: String,
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('ticketchannel', PrefixSchema);
