  
const mongoose = require('mongoose');

const goodbyeSchema = new mongoose.Schema({
  Bye: {
    type: String,
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('goodbye', goodbyeSchema);
