const channelData = require('../../database/guildData/channelupdates')
const { MessageEmbed } = require('discord.js')

module.exports = async(channel) => {
    const data = await channelData.findOne({
        GuildID: channel.guild.id,
    })

    if (!data) return;

    const embed = new MessageEmbed()
    .setTitle("Channel Created")
    .setDescription(`Channel Name: ${channel.name}\nChannel ID: ${channel.id}\nChannel Type: ${channel.type}`)
    .setColor("GREEN")
    .setTimestamp()

    channel.guild.channels.cache.get(data.ChannelID).send({ embeds: [embed] })
}