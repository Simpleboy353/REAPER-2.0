const voiceData = require("../../database/guildData/voiceupdates")
const { MessageEmbed } = require("discord.js")

module.exports = async(oldState, newState) => {
    const data = await voiceData.findOne({
        GuildID: newState.guild.id
    })

    if (!data) return;

    let oldUser = oldState.member
    let newUser = newState.member

    if (oldUser.voice.channelId !== newUser.voice.channelId && newUser.voice.channelId !==  null || undefined) {

        let joinEmbed = new MessageEmbed()
        .setTitle("Voice State Updates")
        .setDescription(`${newUser} joined the voice channel <#${newUser.voice.channelId}>`)
        .setColor("GREEN")
        .setTimestamp()

        newState.guild.channels.cache.get(data.ChannelID).send({ embeds: [joinEmbed] })

    } else if (oldUser.voice.channelId !== newUser.voice.channelId && newUser.voice.channelId ===  null || undefined) {

        let leaveEmbed = new MessageEmbed()
        .setTitle("Voice State Updates")
        .setDescription(`${newUser} left the voice channel <#${oldUser.voice.channelId}>`)
        .setColor("RED")
        .setTimestamp()

        newState.guild.channels.cache.get(data.ChannelID).send({ embeds: [leaveEmbed] })

    } else if (oldState.mute !== newState.mute) {

        let muteEmbed = new MessageEmbed()
        .setTitle("Voice State Updates")
        .setDescription(`${newUser} was ${newState.mute ? "muted" : "unmuted"}`)
        .setColor("GREEN")
        .setTimestamp()

        newState.guild.channels.cache.get(data.ChannelID).send({ embeds: [muteEmbed] })

    } else if (oldState.deaf !== newState.deaf) {

        let deafEmbed = new MessageEmbed()
        .setTitle("Voice State Updates")
        .setDescription(`${newUser} was ${newState.deaf ? "deafened" : "undeafened"}`)
        .setColor("GREEN")
        .setTimestamp()

        newState.guild.channels.cache.get(data.ChannelID).send({ embeds: [deafEmbed] })

    }
}