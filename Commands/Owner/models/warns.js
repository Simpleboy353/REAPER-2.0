const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Warns: {
    type: Number
  },
  GuildID: String,
  UserId: String
});

const MessageModel = module.exports = mongoose.model('Warnings', PrefixSchema);
