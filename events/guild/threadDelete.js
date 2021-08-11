const { MessageEmbed } = require('discord.js');
const channelData = require("../../database/guildData/channelupdates")

module.exports = async(thread) => {
    const data = await channelData.findOne({
        GuildID: thread.guild.id
    })

    if (!data) return;

    const embed = new MessageEmbed()
    .setTitle('Thread Deleted')
    .setDescription(`
Name: ${thread.name}
ID: ${thread.id}
Owner: <@!${thread.ownerId}>
Member Count: ${thread.memberCount}
Messages Sent: ${thread.messages.cache.size}
Parent Channel: ${thread.parent.name}`)
    .setColor("RED")
    .setTimestamp()

    thread.guild.channels.cache.get(data.ChannelID).send({ embeds: [embed] })
}