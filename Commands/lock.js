const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'lock',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: ['lockdown'],
      permLevel: 10,
      botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
      requiredConfigs: [],
      description: 'Locks a channel.',
      quotedStringSupport: true,
      usage: '[channel:channel]',
      usageDelim: ' ',
      extendedHelp: 'No extended help available.',
    });
  }

  async run(message, [channel = message.channel]) {
    const type = channel.type === 'text' ? 'SEND_MESSAGES' : 'CONNECT';
    await channel.overwritePermissions(channel.guild.defaultRole, { [type]: false });
    if (message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES') === false) return true;
    return message.send('This channel is under lockdown.');
  }
};