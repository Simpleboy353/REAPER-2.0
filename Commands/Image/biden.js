const Discord = require('discord.js');

module.exports = {
  name: 'biden',
  permissions: ["SendMessages"],
  cooldown: 3,
  description: 'Get a custom clyde message!',
  run: async(client, message, args) => {
    let bidenMessage = args.join(" ");
    if (!bidenMessage) {
      return message.channel.send('`Usage: (prefix)biden <msg>`')
    }
    if (bidenMessage.length > 65) return message.channel.send('**You Are Not Allowed To Go Over 65 Characters!**');

    message.channel.send({ files: [{ attachment: `https://api.popcatdev.repl.co/biden?text=${bidenMessage}`, name: 'reaperbiden.jpg' }] });
  }
}
