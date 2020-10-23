const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
  Bye: {
    type: String,
  },
  ByeMsg: { 
    type: String,
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('Goodbye', PrefixSchema);
