const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Bye: {
    type: Number,
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('Goodbye', PrefixSchema);
