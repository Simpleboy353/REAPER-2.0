const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name: "ban",
    description: "Ban members from your server!",
    subCommands: ["member", "soft", "hack", "remove"],
    category: "Moderation",
    userPerms: ["BanMembers"],
    botPerms: ["BanMembers", "EmbedLinks"],
    options: [
        {
            name: "member",
            description: "The member you want to ban!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "The member you want to ban!",
                    required: true,
                    type: ApplicationCommandOptionType.Mentionable,
                },
                {
                    name: "reason",
                    description: "The reason for the ban!",
                    required: false,
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: "soft",
            description: "Soft ban a member in you server!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "The member you want to soft ban!",
                    required: true,
                    type: ApplicationCommandOptionType.Mentionable,
                },
                {
                    name: "reason",
                    description: "The reason for the soft ban!",
                    required: false,
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: "hack",
            description: "Bans a member who is not in your server!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "id",
                    description: "The ID of the member you want to ban!",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "reason",
                    description: "The reason for the ban!",
                    required: false,
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: "remove",
            description: "Removes a ban from a member!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "id",
                    description: "The ID of the member you want to remove a ban from!",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "reason",
                    description: "The reason for the ban!",
                    required: false,
                    type: ApplicationCommandOptionType.String
                }
            ]
        }
    ],
    run: async(client, interaction, args) => {
        if (interaction.options.getSubcommand() === "member") {
            let reason = await interaction.options.getString("reason");
    if (!reason) reason = "Unspecified"
    const target = await interaction.options.getMentionable('member');
    
    if(target.id === interaction.member.id) {
      return interaction.reply(`**${interaction.member.user.username}**, You can not ban yourself!`)
    }
    if (target.id === interaction.guild.ownerId) {
      return interaction.reply("You cannot Ban The Server Owner")
    }

    if (target.roles.highest.position >= interaction.member.roles.highest.position) {
      return interaction.reply("You cannot Ban Someone who has higher or same role as you!")
    }
    if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) {
        return interaction.reply("I cannot Ban Someone who has higher or same role as me!")
      }
    
    let banEmbed = new EmbedBuilder()
    .setTitle("Action : Ban")
    .setDescription(`Banned ${target} (${target.id})\nReason: ${reason}`)
    .setColor("#ff2050")
    .setThumbnail(target.avatarURL)
    .setFooter(`Banned by ${interaction.member.user.tag}`);
    
    target
    .ban({
      reason: reason ? "Infinity Ban Command" : reason
    })
    
    return interaction.reply({ embeds: [banEmbed] })
    
    } else if (interaction.options.getSubcommand() === "soft") {

      let reason = await interaction.options.getString("reason");
      if (!reason) reason = "Unspecified"
      const target = await interaction.options.getMentionable('member');
            
      if(target.id === interaction.member.id) {
        return interaction.reply(`**${interaction.member.user.username}**, You can not ban yourself!`)
      }
      if (target.id === interaction.guild.ownerId) {
        return interaction.reply("You cannot Ban The Server Owner")
      }
        
            if (target.roles.highest.position >= interaction.member.roles.highest.position) {
              return interaction.reply("You cannot Ban Someone who has higher or same role as you!")
            }
            if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) {
                return interaction.reply("I cannot Ban Someone who has higher or same role as me!")
            }
            
            let softBanEmbed = new EmbedBuilder()
            .setTitle("Action : Ban")
            .setDescription(`Banned ${target} (${target.id})\nReason: ${reason}`)
            .setColor("#ff2050")
            .setThumbnail(target.avatarURL)
            .setFooter(`Banned by ${message.author.tag}`);
            
            target
            .ban({
              days: 1,
              reason: reason ? "Infinity Ban Command" : reason,
            })
            
              message.channel.send({ embeds: [softBanEmbed] })
        } else if (interaction.options.getSubcommand() === "hack") {
            let reason = await interaction.options.getString("reason");
            if (!reason) reason = "Unspecified"
            const target = await interaction.options.getString('id');

            let targetUser = await client.users.fetch(target)

            if (!targetUser) {
                return interaction.reply('Couldn\'t find the user!')
            }
            
            if(target === interaction.member.id) {
              return interaction.reply(`**${interaction.member.user.username}**, You can not ban yourself!`)
            }
            if (target === interaction.guild.ownerId) {
              return interaction("You cannot Ban The Server Owner")
            }
            let targetMember = await targetUser.member
            let hackBanEmbed = new EmbedBuilder()
            .setTitle("Action : Ban")
            .setDescription(`Banned ${targetUser} (${target})\nReason: ${reason}`)
            .setColor("#ff2050")
            .setThumbnail(targetUser.avatarURL)
            .setFooter(`Banned by ${interaction.member.user.tag}`);
            
            await interaction.guild.members.ban(target, {
              reason: reason ? "Infinity Ban Command" : reason
            })
            
              return interaction.reply({ embeds: [hackBanEmbed] })
        } else if (interaction.options.getSubcommand() === "remove") {
            let reason = await interaction.options.getString("reason");
            if (!reason) reason = "Unspecified"
            const target = await interaction.options.getString('id');

            let targetUser = await client.users.fetch(target)

            if (!targetUser) {
                return interaction.reply('Couldn\'t find the user!')
            }
            
            if(target === interaction.member.id) {
              return interaction.reply(`**${interaction.member.user.username}**, You can not unban yourself!`)
            }
            if (target === interaction.guild.ownerId) {
              return interaction("You cannot unan The Server Owner")
            }
            let targetMember = await targetUser.member
            let unBanEmbed = new EmbedBuilder()
            .setTitle("Action : Unban")
            .setDescription(`Unbanned ${targetUser} (${target})\nReason: ${reason}`)
            .setColor("GREEN")
            .setThumbnail(targetUser.avatarURL)
            .setFooter(`Unbanned by ${interaction.member.user.tag}`);
            
            await interaction.guild.members.unban(target,{
              reason: reason ? "Infinity Ban Command" : reason
            })
            
              return interaction.reply({ embeds: [unBanEmbed] }) 
        }
    }
}