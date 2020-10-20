const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Warns: {
    type: String
  },
  GuildID: String,
  UserId: String
});

const MessageModel = module.exports = mongoose.model('Warnings', PrefixSchema);
