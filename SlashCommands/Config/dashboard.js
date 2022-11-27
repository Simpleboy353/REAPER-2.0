const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "dashboard",
    description: "View the dashboard for the required category.",
    userPerms: ["Administrator"],
    options: [
        {
            name: "admin",
            description: "Shows the admin menu",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "welcomer",
            description: "Shows the welcomer menu",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "logging",
            description: "Shows the logging menu",
            type: ApplicationCommandOptionType.Subcommand,
        }
    ],
    run: async(client, interaction, args)=>{
        
        if (interaction.options.getSubcommand() === "admin") {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has("ADMINISTRATOR")) {
                return interaction.reply("Missing Permissions")
            }
            const adminMenu = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId("adminMenu")
                .setPlaceholder("Admin Menu")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "Antilink",
                        description: "Enable or Disable Antilink System!",
                        value: "antilink",
                    },
                    {
                        label: "AutoRole",
                        description: "Enable or Disable AutoRole System!",
                        value: "autorole",
                    },
                    {
                        label: "AutoMod",
                        description: "Enable or Disable AutoMod System!",
                        value: "automod",
                    },
                    {
                        label: "Prefix",
                        description: "Change the bot's prefix for your server!",
                        value: "prefix"
                    },
                    {
                        label: "Rep System",
                        description: "Enable or Disable Rep System!",
                        value: "rep",
                    },
                    {
                        label: "Suggestion System",
                        description: "Enanble or Disable Suggestion System",
                        value: "suggestions"
                    }
                ])
            )

            return interaction.reply({ content: "This message will be edited, each time you change a setting!\n", components: [adminMenu]})

        } else if (interaction.options.getSubcommand() === "welcomer") {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has("MANAGE_GUILD")) {
                return interaction.reply("Missing Permissions")
            }
            const welcomerMenu = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId("welcomerMenu")
                .setPlaceholder("Welcomer Menu")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "Welcome Channel",
                        description: "Set the welcome channel for the server!",
                        value: "welcome_channel",
                    },
                    {
                        label: "Leave Channel",
                        description: "Set the leave channel for the server!",
                        value: "leave_channel",
                    },
                    {
                        label: "Welcome Message",
                        description: "Set the welcome message for the server!",
                        value: "welcome_message",
                    },
                    {
                        label: "Leave Message",
                        description: "Set the leave message for the server!",
                        value: "leave_message",
                    },
                    {
                        label: "Variables for Welcomer",
                        description: "Shows all the available variables for use in custom messages",
                        value: "variables",
                    }
                ])
            )

            return interaction.reply({ content: "This message will be edited, each time you change a setting!\n" ,components: [welcomerMenu]})

        } else if (interaction.options.getSubcommand() === "logging") {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has("MANAGE_GUILD")) {
                return interaction.reply("Missing Permissions")
            }
            const loggingMenu = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId("loggingMenu")
                .setPlaceholder("Logging Menu")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "Channel Updates",
                        description: "Set the channel for logging channel updates",
                        value: "channel_logs",
                    },
                    {
                        label: "Member Updates",
                        description: "Set the channel for logging member updates",
                        value: "member_updates",
                    },
                    {
                        label: "Message Logs",
                        description: "Set the channel for message logs",
                        value: "message_logs",
                    },
                    {
                        label: "Role Updates",
                        description: "Set the channel for logging role updates",
                        value: "role_updates",
                    },
                    {
                        label: "Server Updates",
                        description: "Set the channel for logging the server updates",
                        value: "server_updates",
                    },
                    {
                        label: "Voice State Updates",
                        description: "Set the channel for logging voice state updates",
                        value: "voice_state_updates",
                    }
                ])
            )

            return interaction.reply({ content: "This message will be edited, each time you change a setting!\n" ,components: [loggingMenu]})
        }
    }
}