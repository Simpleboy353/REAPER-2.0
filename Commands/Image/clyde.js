const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'clyde',
  description: 'Get a custom clyde message!',
  botPerms: ["ATTACH_FILES"],
  run: async(client, message, args) => {
    if (!args[0]) {
    return message.channel.send(`Usage: ${client.prefix}clyde <msg>`)
    }
    let clydeMessage = args.join(' ');

    message.channel.send({ files : [{ attachment: `https://ctk-api.herokuapp.com/clyde/${clydeMessage}`, name: 'file.jpg' }]});
  }
} 
