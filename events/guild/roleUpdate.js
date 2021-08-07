const roleData = require('../../database/guildData/roleupdates')
const { MessageEmbed } = require('discord.js')

module.exports = async(oldRole, newRole) => {
    const data = await roleData.findOne({
        GuildID: newRole.guild.id
    })

    if (!data) return;

    if (newRole.name !== oldRole.name) {
        let nameEmbed = new MessageEmbed()
        .setTitle('Role Updates')
        .setDescription(`Updated ${newRole}`)
        .addField('Name', `${oldRole.name} => ${newRole.name}`)
        .setColor("GREEN")
        .setTimestamp()

        newRole.guild.channels.cache.get(data.ChannelID).send({ embeds: [nameEmbed] })

    } else if (newRole.color !== oldRole.color) {
        let colorEmbed = new MessageEmbed()
        .setTitle('Role Updates')
        .setDescription(`Updated ${newRole}`)
        .addField('Color', `${oldRole.color} => ${newRole.color}`)
        .setColor("GREEN")
        .setTimestamp()

        newRole.guild.channels.cache.get(data.ChannelID).send({ embeds: [colorEmbed] })

    } else if (newRole.hoist !== oldRole.hoist) {
        let oldHoist = oldRole.hoist ? 'Yes' : 'No'
        let newHoist = newRole.hoist ? 'Yes' : 'No'
        let hoistEmbed = new MessageEmbed()
        .setTitle('Role Updates')
        .setDescription(`Updated ${newRole}`)
        .addField('Hoisted', `${oldHoist} => ${newHoist}`)
        .setColor("GREEN")
        .setTimestamp()

        newRole.guild.channels.cache.get(data.ChannelID).send({ embeds: [hoistEmbed] })

    } else if (newRole.mentionable !== oldRole.mentionable) {
        let oldMentionable = oldRole.mentionable ? 'Yes' : 'No'
        let newMentionable = newRole.mentionable ? 'Yes' : 'No'
        let mentionableEmbed = new MessageEmbed()
        .setTitle('Role Updates')
        .setDescription(`Updated ${newRole}`)
        .addField('Mentionable', `${oldMentionable} => ${newMentionable}`)
        .setColor("GREEN")
        .setTimestamp()

        newRole.guild.channels.cache.get(data.ChannelID).send({ embeds: [mentionableEmbed] })

    }
}