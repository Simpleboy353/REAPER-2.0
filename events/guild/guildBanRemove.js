const memberData = require('../../database/guildData/memberupdates')
const { MessageEmbed } = require('discord.js')

module.exports = async(member) => {
    const data = await memberData.findOne({
        GuildID: member.guild.id
    })

    if (!data) return;

    const embed = new MessageEmbed()
    .setTitle('Member Unbanned')
    .setDescription(`User: ${member.user.tag} (${member})\nUser ID: ${member.id}\nAcc Created On: ${member.user.createdAt}`)
    .setColor("GREEN")
    .setTimestamp()

    member.guild.channels.cache.get(data.ChannelID).send({ embeds: [embed] })
}