const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "lettertile",
    description: "Play lettertile.io in Discord",
    run: async(client, message, args) => {

      if (!message.member.voice.channelId) {
        return message.channel.send('You need to join a voice channel first!')
      }
        client.discordTogether.createTogetherCode(message.member.voice.channelId, 'lettertile').then(async(invite) => {
            
            let embed = new MessageEmbed()
            .setTitle("LetterTile.io")
            .setDescription(`[Click Here](${invite.code}) to play LetterTile.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("GREEN")
            .setFooter(`Requested By: ${message.author.tag}`)
            
            return message.channel.send({ embeds: [embed] });
        });
    }
}