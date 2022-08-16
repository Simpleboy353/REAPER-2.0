const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'delete',
    description: "Delete channels or roles in  your server!",
    userPerms: ["ManageChannels", "ManageRoles"],
    options: [
        {
            name: 'channel',
            description: 'Channel to delete',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'Channel to delete',
                    required: true,
                    type: ApplicationCommandOptionType.Channel
                }
            ],
        },
        {
            name: 'role',
            description: 'Role to delete',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'Role to delete',
                    required: true,
                    type: ApplicationCommandOptionType.Role
                }
            ]
        }
    ],
    run: async(client, interaction, args) => {
        if (interaction.options.getSubcommand() === "role") {
            try {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has("MANAGE_ROLES")) {
                return interaction.reply('Missing Permissions!')
            }
            const role = interaction.options.getString('role');
            let deleteRole = await interaction.guild.roles.cache.find(r => r.name === role)

            if (!deleteRole) {
                return interaction.reply('Role not found!')
            }

            if (interaction.guild.me.roles.highest.postion < deleteRole.postion) {
                return interaction.reply('I cannot delete a role higher than my own roles!')
            } else if (interaction.member.roles.highest.position < deleteRole.postion) {
                return interaction.reply('You cannot delete a role higher than your own roles!!')
            }

            await deleteRole.delete()

            const roleEmbed = new EmbedBuilder()
            .setTitle("Role Deleted")
            .setDescription(`
Name: ${deleteRole.name}
ID: ${deleteRole.id}
Deleted By: ${interaction.member.user.username}`)
            .setColor("Red")

            return interaction.reply({ embeds: [roleEmbed] })
            } catch (err) {
                console.log(err)
                return interaction.reply(`An Error Occured: ${err}`)
            }
        } else if (interaction.options.getSubcommand() === "channel") {
            try {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has("MANAGE_CHANNELS")) {
                return interaction.reply('Missing Permissions!')
            }

            let channel = interaction.options.getString('channel');
            let toBeDeletedChannel = await interaction.guild.channels.cache.find(ch => ch.name === channel)

            if (!toBeDeletedChannel) {
                return interaction.reply('Channel not found!')
            }

            await toBeDeletedChannel.delete();

            const channelEmbed = new EmbedBuilder()
            .setTitle("Channel Deleted")
            .setDescription(`
Name: ${toBeDeletedChannel.name}
ID: ${toBeDeletedChannel.id}
Type: ${toBeDeletedChannel.type}
Deleted By: ${interaction.member.user.username}`)
            .setColor("RED")

            return interaction.reply({ embeds: [channelEmbed] })
        } catch (err) {
            console.log(err)
            return interaction.reply(`An Error Occured: ${err}`)
        }
        }
    }
}
