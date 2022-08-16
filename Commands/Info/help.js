const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder} = require("discord.js");

module.exports = {
  name: "help",
  description: "Get the Command List",
  enabled: true,
  ownerOnly: false,
  nsfwOnly: false,
  aliases: ["commands", "cmd", "h"],
  botPerms: ["EmbedLinks"],
  run: async (client, message, args) => {
    if (args[0]) {
      let command = args[0];
      let cmd = client.commands.get(command);

      if (!cmd) {
        return message.channel.send("Couldn't find that command!")
      } else if (cmd) {
        let description = cmd.description ? cmd.description : "No description available.";
        let aliases = cmd.aliases ? cmd.aliases.join(", ") : "No aliases available.";
        let botPerms = cmd.botPerms ? cmd.botPerms.join(", ") : "No permissions required.";
        let userPerms = cmd.userPerms ? cmd.userPerms.join(", ") : "No permissions required.";
        let ownerOnly = cmd.ownerOnly ? "Yes" : "No";
        let nsfwOnly = cmd.nsfwOnly ? "Yes" : "No";
        let cooldown = cmd.cooldown ? cmd.cooldown : "No cooldown.";
        let isDisabled = cmd.isDisabled ? "Yes" : "No";

        let helpEmbed = new EmbedBuilder()
        .setTitle(`Help for **${cmd.name}**`)
        .addFields([
          { name: "Name", value: `${cmd.name}`},
          { name: "Description", value: `${description}`},
          { name: "Aliases", value: `${aliases}`},
          { name: "Owner Only", value: `${ownerOnly}`},
          { name: "NSFW Only", value: `${nsfwOnly}`},
          { name:"Cooldown", value:`${cooldown}`},
          { name: "Required Bot Permissions", value: `${botPerms}`},
          { name: "Required User Permissions", value: `${userPerms}`}
        ])
        .setColor("Green")

        return message.channel.send({ embeds: [helpEmbed] })
      }

    } else if (!args[0]) {

    let helpMenu = new ActionRowBuilder()
    .addComponents(
      new SelectMenuBuilder()
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
          label: "Activities",
          description: "Access the new Discord Activities Feature",
          value: "activities",
          emoji: "🎮"
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

    let editEmbed = new EmbedBuilder()
    .setTitle('Help Menu')
    .setDescription('Choose an option from the menu below!')
    .setColor("Green")

      message.channel.send({ embeds: [editEmbed], components: [helpMenu]}).then(msg=>{
        setTimeout(async function () {
          await msg.delete();
        }, 180000)
      })
    }
  }
};
