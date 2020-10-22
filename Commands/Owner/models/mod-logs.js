const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Mod: {
    type: String
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('modlogs', PrefixSchema);
