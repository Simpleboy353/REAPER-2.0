const Discord = module.require('discord.js');
module.exports = {
  name: 'clyde',
  description: 'Get a custom clyde message!',
  run: async(client, message, args) => {
    if (!args[0]) {
    return message.channel.send('`Usage: =clyde <msg>`')
    }
    let clydeMessage = args.slice(0).join(' ');

    message.channel.send({files : [{attachment: `https://ctk-api.herokuapp.com/clyde/${clydeMessage}`, name: 'file.jpg'}]});
  }
}
