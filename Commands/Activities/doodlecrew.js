const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "doodlecrew",
    description: "Play DoodleCrew.io in Discord",
    run: async(client, message, args) => {

      if (!message.member.voice.channelId) {
        return message.channel.send('You need to join a voice channel first!')
      }
        client.discordTogether.createTogetherCode(message.member.voice.channelId, 'doodlecrew').then(async(invite) => {
            
            let embed = new MessageEmbed()
            .setTitle("Doodle Crew.io")
            .setDescription(`[Click Here](${invite.code}) to play Doodle Crew.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("GREEN")
            .setFooter(`Requested By: ${message.author.tag}`)
            
            return message.channel.send({ embeds: [embed] });
        });
    }
}