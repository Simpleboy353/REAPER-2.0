const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Warns: {
    type: Number
  },
  UserID: String,
  GuildId: String
});

const MessageModel = module.exports = mongoose.model('Warnings', PrefixSchema);
