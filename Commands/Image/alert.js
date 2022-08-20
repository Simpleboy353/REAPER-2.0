const Discord = require('discord.js');

module.exports = {
  name: 'alert',
  permissions: ["SendMessages"],
  cooldown: 3,
  enabled: false,
  description: 'Alert meme',
  async execute(client, message, cmd, args, Discord) {
    if (!args[0]) {
      return message.channel.send('`Usage: (prefix)alert <msg>`')
    }
    let alertMessage = args.slice(0).join(' ');
    if (alertMessage.length > 65) return message.channel.send('**You Are Not Allowed To Go Over 65 Characters!**');

    message.channel.send({ files: [{ attachment: `https://api.popcatdev.repl.co/alert?text=${alertMessage}`, name: 'reaperalert.jpg' }] });
  }
}
