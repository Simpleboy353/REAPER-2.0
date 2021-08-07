const roleData = require('../../database/guildData/roleupdates')
const { MessageEmbed } = require('discord.js')

module.exports = async(role) => {
    const data = await roleData.findOne({
        GuildID: role.guild.id,
    })

    if (!data) return;

    const embed = new MessageEmbed()
    .setTitle("Role Deleted")
    .setDescription(`Role Name: ${role.name}\nRole ID: ${role.id}\nHoisted: ${role.hoisted ? "Yes" : "No"}\nMentionable: ${role.mentionable ? "Yes" : "No"}`)
    .setColor("GREEN")
    .setTimestamp()

    role.guild.channels.cache.get(data.ChannelID).send({ embeds: [embed] })
}