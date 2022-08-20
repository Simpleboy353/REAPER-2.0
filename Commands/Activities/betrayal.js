const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "betrayal",
    description: "Play betrayal.io in Discord",
    run: async(client, message, args) => {

      if (!message.member.voice.channelId) {
        return message.channel.send('You need to join a voice channel first!')
      }
        client.discordTogether.createTogetherCode(message.member.voice.channelId, 'betrayal').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Betrayal.io")
            .setDescription(`[Click Here](${invite.code}) to play Betrayal.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            
            return message.channel.send({ embeds: [embed] });
        });
    }
}