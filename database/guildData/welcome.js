  
const mongoose = require('mongoose');

const welcomeSchema = new mongoose.Schema({
  Welcome: {
    type: String,
  },
  GuildID: String
});

const MessageModel = module.exports = mongoose.model('welcomer', welcomeSchema);
