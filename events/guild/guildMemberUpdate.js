const memberData = require('../../database/guildData/memberupdates')
const { MessageEmbed } = require('discord.js')

module.exports = async(oldMember, newMember) => {
    const data = await memberData.findOne({
        GuildID: newMember.guild.id
    })

    if (!data) return;

    if (newMember.nickname !== oldMember.nickname) {
        let oldNickname = oldMember.nickname ? oldMember.nickname : oldMember.user.username
        let newNickname = newMember.nickname ? newMember.nickname : newMember.user.username
        let nicknameEmbed = new MessageEmbed()
        .setTitle(`${newMember.user.tag}`)
        .addField('User Nickname Changed', `${oldNickname} => ${newNickname}`)
        .setColor("GREEN")
        .setTimestamp()
        .setThumbnail(`${newMember.user.avatarURL()}`)

        newMember.guild.channels.cache.get(data.ChannelID).send({ embeds: [nicknameEmbed] })

    } else if (newMember.user.username !== oldMember.user.username) {

        let oldusername = oldMember.user.username
        let newusername = newMember.user.username

        let usernameEmbed = new MessageEmbed()
        .setTitle(`${newMember.user.tag}`)
        .addField('User Username Changed', `${oldusername} => ${newusername}`)
        .setColor("GREEN")
        .setTimestamp()
        .setThumbnail(`${newMember.user.avatarURL()}`)

        newMember.guild.channels.cache.get(data.ChannelID).send({ embeds: [usernameEmbed] })

    } else if (newMember.user.avatarURL() !== oldMember.user.avatarURL()) {

        let oldavatar = oldMember.user.avatarURL()
        let newavatar = newMember.user.avatarURL()

        let avatarEmbed = new MessageEmbed()
        .setTitle(`${newMember.user.tag}`)
        .addField('User Avatar Changed', `${oldavatar} => ${newavatar}`)
        .setColor("GREEN")
        .setTimestamp()
        .setThumbnail(`${newMember.user.avatarURL()}`)

        newMember.guild.channels.cache.get(data.ChannelID).send({ embeds: [avatarEmbed] })

    } else {
        return;
    }
}