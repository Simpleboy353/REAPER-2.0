const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
  name: "help",
  description: "Shows the Help Menu",
  options: [
    {
      name: "menu",
      description: "Shows the Help Menu",
      type: 'SUB_COMMAND'
    }
  ],
  run: async (client, interaction, args) => {

    if (interaction.options.getSubcommand() === "menu") {

    let helpMenu = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("help_menu")
      .setPlaceholder('Help Menu')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Settings",
          description: "Change the bot settings",
          value: "settings",
          emoji: "🛠"
        },
        {
          label: "Fun",
          description: "Shows all the fun commands",
          value: "fun",
          emoji: "🎲"
        },
        {
          label: "Image",
          description: "Shows all the image commands",
          value: "image",
          emoji: "🖼"
        },
        {
          label: "Information",
          description: "Shows all the information commands",
          value: "info",
          emoji: "📢"
        },
        {
          label: "Moderation",
          description: "Shows all the moderation commands",
          value: "moderation",
          emoji: "🔒"
        },
        {
          label: "Music",
          description: "Shows all the Music commands!",
          value: "music",
          emoji: "🎵"
        },
        {
          label: "NSFW",
          description: "Shows all the NSFW commands",
          value: "nsfw",
          emoji: "🔞"
        },
        {
          label: "Utility",
          description: "Shows all the utility commands",
          value: "utility",
          emoji: "🔧"
        },
        {
          label: "Games",
          description: "Shows all the game commands",
          value: "game",
          emoji: "🎮"
        }
      ])
    )

    let helpEmbed = new MessageEmbed()
    .setTitle('Help Menu')
    .setDescription('Choose an option from the menu below!')
    .setColor("GREEN")

    const msg = interaction.reply({ embeds: [helpEmbed], components: [helpMenu]})

    setTimeout(function(){
      msg.delete()
    }, 180000)
    }
  }
};
