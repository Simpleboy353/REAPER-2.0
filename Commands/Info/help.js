const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
  name: "help",
  description: "Get the Command List",
  aliases: ["commands", "cmd", "h"],
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {

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
        }
      ])
    )

    let editEmbed = new MessageEmbed()
    .setTitle('Help Menu')
    .setDescription('Choose an option from the menu below!')
    .setColor("GREEN")

    const msg = message.channel.send({ embeds: [editEmbed], components: [helpMenu]})

<<<<<<< Updated upstream
      return message.channel.send({ embeds: [embed6] });
    } else if (args[0] === "image") {
      const embed7 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Image Commands")
        .setDescription(
          "`achievement`, `amazeme`, `amiajoke`, `bad`, `catsay`, `challenge`, `changemymind`, `creatememe`, `didyoumean`, `drake`, `facts`, `illegal`, `jokeoverhead`, `phb`, `rip`, `scroll`, `tableflip`, `textimage`, `trash`, `trigger`, `trumptweet`, `wasted`, `wideavatar`"
        )
        .setFooter(`Use ${prefix} before each command!`);

      return message.channel.send({ embeds: [embed7] });
    } else if (args[0] === "nsfw") {
      const embed8 = new Discord.MessageEmbed()
        .setTitle("NSFW Commands")
        .setDescription(
          "`4k`, `anal`, `ass`, `blowjob`, `boobs`, `cumsluts`, `danbooru`, `hentai`, `milf`, `pussy`, `urban`"
        )
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

      return message.channel.send({ embeds: [embed8] });
    } else if (args[0] === "config") {
      const embed9 = new Discord.MessageEmbed()
        .setTitle("Config Commands")
        .setDescription(
          "`autorole`, `antilink`, `dashboard`, `joinchannel`, `joinmessage`, `leavechannel`, `leavemessage` `prefix`"
        )
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

      return message.channel.send({ embeds: [embed9] });
    }
  },
=======
    setTimeout(function(){
      msg.delete()
    }, 180000)
  }
>>>>>>> Stashed changes
};
