const { MessageEmbed } = require('discord.js');
const channelData = require("../../database/guildData/channelupdates")

module.exports = async(thread) => {
    const data = await channelData.findOne({
        GuildID: thread.guild.id
    })

    if (!data) return;

    const embed = new MessageEmbed()
    .setTitle('Thread Created')
    .setDescription(`
Name: ${thread.name}
ID: ${thread.id}
Created By: ${thread.guild.members.cache.get(thread.ownerId)}
Parent Channel: ${thread.parent.name}`)
    .setColor("GREEN")
    .setTimestamp()

    thread.guild.channels.cache.get(data.ChannelID).send({ embeds: [embed] })
}
