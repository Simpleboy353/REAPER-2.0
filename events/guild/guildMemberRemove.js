const memberData = require("../../database/guildData/memberupdates")
const { MessageEmbed } = require("discord.js")

module.exports = async (member) => {
    const data = await memberData.findOne({
        GuildID: member.guild.id,
    })

    if (!data) return;

    const embed = new MessageEmbed()
    .setTitle('Member Left')
    .setDescription(`User: ${member.user.tag} (${member})\nUser ID: ${member.id}\nAcc. Created: ${member.user.createdAt}\nServer Mmebr Count: ${member.guild.memberCount}`)
    .setColor("GREEN")
    .setTimestamp()
    .setThumbnail(`${member.user.avatarURL}`)

    member.guild.channels.cache.get(data.ChannelID).send({ embeds: [embed]})
}