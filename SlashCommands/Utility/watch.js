const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "watch",
    description: "Watch Youtube on Discord!",
    options: [
        {
          name: "youtube",
          description: "Watch Youtube on Discord!",
          type: 'SUB_COMMAND'
        }
      ],
    run: async(client, interaction, args) => {

        if (interaction.options.getSubcommand() === 'youtube') {

        let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }

        client.discordTogether.createTogetherCode(member.voice.channelId, 'youtube').then(async(invite) => {
            
            let embed = new MessageEmbed()
            .setTitle("Youtube Together")
            .setDescription(`[Click Here](${invite.code}) to access Youtube Together!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("RED")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }
    }
}