const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name: "activity",
    description: "Use The Discord's activity feature",
    options: [
        {
          name: "youtube",
          description: "Watch Youtube on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "chess",
          description: "Play chess on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "awkword",
          description: "Play Awkword.io on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "doodlecrew",
          description: "Play Doodle Crew on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
         {
          name: "fishington",
          description: "Play Fishington.io on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
         {
          name: "lettertile",
          description: "Play Lettertile.io on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
         {
          name: "poker",
          description: "Play Poker.io on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
         {
          name: "spellcast",
          description: "Play Spellcast.io on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "checkers",
          description: "Play Checkers.io on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "puttparty",
          description: "Play Puttparty on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "wordsnack",
          description: "Play Wordsnack on Discord!",
          type: ApplicationCommandOptionType.Subcommand
        }

      ],
    run: async(client, interaction, args) => {

        if (interaction.options.getSubcommand() === 'youtube') {

        let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }

        client.discordTogether.createTogetherCode(member.voice.channelId, 'youtube').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Youtube Together")
            .setDescription(`[Click Here](${invite.code}) to access Youtube Together!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Red")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        } else if (interaction.options.getSubcommand() === 'awkword') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'awkword').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Awkword.io")
            .setDescription(`[Click Here](${invite.code}) to play Awkword.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }else if (interaction.options.getSubcommand() === 'chess') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'chessDev').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Chess.io")
            .setDescription(`[Click Here](${invite.code}) to play Chess.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }        else if (interaction.options.getSubcommand() === 'betrayal') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'betrayal').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Betrayal.io")
            .setDescription(`[Click Here](${invite.code}) to play Betrayal.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }else if (interaction.options.getSubcommand() === 'doodlecrew') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'doodlecrew').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Doodle Crew")
            .setDescription(`[Click Here](${invite.code}) to play Doodle Crew!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }
        else if (interaction.options.getSubcommand() === 'fishington') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'fishington').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Fishington.io")
            .setDescription(`[Click Here](${invite.code}) to play Fishington.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }else if (interaction.options.getSubcommand() === 'lettertile') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'lettertile').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Lettertile.io")
            .setDescription(`[Click Here](${invite.code}) to play Lettertile.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }
        else if (interaction.options.getSubcommand() === 'poker') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'poker').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Poker.io")
            .setDescription(`[Click Here](${invite.code}) to play Poker.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }else if (interaction.options.getSubcommand() === 'spellcast') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'spellcast').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Spellcast.io")
            .setDescription(`[Click Here](${invite.code}) to play Spellcast.io!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }else if (interaction.options.getSubcommand() === 'checkers') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'checkers').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Checkers")
            .setDescription(`[Click Here](${invite.code}) to play Checkers!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }else if (interaction.options.getSubcommand() === 'puttparty') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'puttparty').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Puttparty")
            .setDescription(`[Click Here](${invite.code}) to play Puttparty!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }else if (interaction.options.getSubcommand() === 'wordsnack') {
          let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id)

        if (!member.voice.channelId) {
            return interaction.reply('You need to join a voice channel first!')
          }
        client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'wordsnack').then(async(invite) => {
            
            let embed = new EmbedBuilder()
            .setTitle("Wordsnack")
            .setDescription(`[Click Here](${invite.code}) to play Wordsnack!\n\`\`\`\nNote: This feature is not availble for mobile users!\`\`\``)
            .setColor("Green")
            .setFooter(`Requested By: ${interaction.member.user.username}`)
            
            return interaction.reply({ embeds: [embed] });
        });
        }
    }
}
