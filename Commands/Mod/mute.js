const { Client, Message, EmbedBuilder } = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'mute',
    description: 'Mutes the specified user.',
    usage: 'Mute @user [time] [reason]',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, Discord) => {

        const member = message.mentions.members.first();
        let time = args[1];
        const reason = args.slice(2).join(' ');
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')

        if (!member) return message.reply('Mention a user!');
        if (!time) return message.reply('Tell the time!');
        if (!reason) return message.reply('Tell me a reason');

        if (member.id === message.author.id) return message.reply('You cant mute your self!')
        if (member.id === client.id) return message.reply('You cant mute me!')

        if (!role) {
            try {
                message.channel.send('No muted role.. making one..!')
                let muterole = await message.guild.roles.create({
                    name: 'Muted',
                });
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.permissionOverwrites.create(muterole, { SendMessages: false, AddReactions: false});
                });
                const embed = new EmbedBuilder()
                    .setDescription('Muted role has sucessfully been created')
                    .setColor("Green")
                await message.channel.send({ embeds: [embed] });
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (member.roles.cache.has(role2)) return message.reply('User is already muted! ')

        if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply('You cant mute this user')


        await member.roles.add(role2)
        message.channel.send(`${member.user.username} has been muted for ${ms(ms(time))}, Reason: ${reason}`)

        setTimeout(() => {
            member.roles.remove(role2)
        }, ms(time))

    }



}
