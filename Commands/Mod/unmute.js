const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Unmutes the specified user.',
    usage: '',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, Discord) => {

        const member = message.mentions.members.first();
        let target = message.guild.members.cache.get(member.id)
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')

        target.roles.remove(role.id);
        message.reply('Unmuted!')


    }
}
