const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "chess",
    description: "Play chess in Discord",
    run: async(client, message, args) => {

      if (!message.member.voice.channelId) {
        return message.channel.send('You need to join a voice channel first!')
      }
        client.discordTogether.createTogetherCode(message.member.voice.channelId, 'chessDev').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Chess.io")
            .setDescription(`[Click Here](${invite.code}) to play Chess!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            
            return message.channel.send({ embeds: [embed] });
        });
    }
}