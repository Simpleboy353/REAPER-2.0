const Discord = require('discord.js');
const OWNER_ID = require('../../config.json').OWNER_ID;
const ERROR_LOGS_CHANNEL = require('../../config.json').ERROR_LOGS_CHANNEL;
require('dotenv');

module.exports = {
  name: "leaveservers",
  description: "Check what Servers the bot is in!",
  run: async (client, message, args) => {
    try {
      if (message.author.id != OWNER_ID) return message.channel.send(`<a:_cross:725303285015117844> Owner Only <a:_cross:725303285015117844>`);
      let data = [];
      client.guilds.cache.forEach(x => {
        if (x.memberCount <= 10) {
          x.leave()
        message.channel.send(`🔹 Left **${x.name}** as it had \`${x.memberCount}\` members\n............................`);
        } 
      });

      if (data.length > 0) {
        data.sort();
        data = `🔹 ` + data.join('\n🔹');
      }
      else {
        data = "[No server found]";
      }
    } catch (err) {

      const errorlogs = client.channels.cache.get(ERROR_LOGS_CHANNEL)

      message.channel.send(`Whoops, We got a error right now! This error has been reported to Support center!`)

      errorlogs.send(`Error on bs commands!\n\nError:\n\n ${err}`)

    }
  }
};