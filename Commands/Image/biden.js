const Discord = require('discord.js');

module.exports = {
  name: 'biden',
  permissions: ["SEND_MESSAGES"],
  cooldown: 3,
  description: 'Get a custom clyde message!',
  async execute(client, message, cmd, args, Discord) {
    if (!args[0]) {
      return message.channel.send('`Usage: (prefix)biden <msg>`')
    }
    let bidenMessage = args.slice(0).join(' ');
    if (bidenMessage.length > 65) return message.channel.send('**You Are Not Allowed To Go Over 65 Characters!**');

    message.channel.send({ files: [{ attachment: `https://api.popcatdev.repl.co/biden?text=${bidenMessage}`, name: 'reaperbiden.jpg' }] });
  }
}
