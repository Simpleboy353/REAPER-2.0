const Discord = require('discord.js');

require('dotenv');

module.exports = {
  name: "serversof",
  description: "Check what Servers the bot is in!",
  run: async (client, message, args) => {
    let id = args[0];
    if (!id) return message.channel.send("Enter an ID")
    try {
      if (message.author.id != "661501985517862972") return message.channel.send(`<a:_cross:725303285015117844> Developer Only <a:_cross:725303285015117844>`);
      let data = [];
      client.guilds.cache.forEach(x => {
        if (x.owner.id == id) {
        message.channel.send(`🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`);
        } else return message.channel.send(`I am in no server owned by <@${id}>`)
      });

      if (data.length > 0) {
        data.sort();
        data = `🔹 ` + data.join('\n🔹');
      }
      else {
        data = "[No server found]";
      }
    } catch (err) {

      const errorlogs = client.channels.cache.get('747750993583669258')

      message.channel.send(`Whoops, We got a error right now! This error has been reported to Support center!`)

      errorlogs.send(`Error on bs commands!\n\nError:\n\n ${err}`)

    }
  }
};