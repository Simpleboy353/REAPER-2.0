const Discord = require("discord.js");
const prefixModel = require('../../database/guildData/prefix')

module.exports = {
  name: "help",
  description: "Get the Command List",
  aliases: ["commands", "cmd", "h"],
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    const avatar = client.user.avatarURL;
    const prefixData = await prefixModel.findOne({
      GuildID: message.guild.id,
    }).catch(err=>console.log(err))
  
    if (prefixData) {
      var prefix = prefixData.Prefix
    } else if (!prefixData) {
      prefix = "+"
    }
    client.prefix = prefix;
    if (!args[0]) {
      const embed = new Discord.MessageEmbed()
        .setThumbnail(avatar)
        .setTitle("Available Command Categories")
        .addField(
          `**》CONFIGURATION**`,
          `\`${prefix}help config\`\nConfigure the bot as per your server!`
        )
        .addField(
          `**》FUN**`,
          `\`${prefix}help fun\`\nHave some fun in your Server!`
        )
        .addField(
          `**》IMAGE**`,
          `\`${prefix}help image\`\nManipulate Images with these Commands!`
        )
        .addField(
          `**》INFORMATION**`,
          `\`${prefix}help info\`\nGet some info relating the Server, users or our Bot`
        )
        .addField(
          `**》MODERATION**`,
          `\`${prefix}help mod\`\nIssues relating some users? Use these Commands`
        )
        .addField(
          `**》NSFW**`,
          `\`${prefix}help nsfw\`\nSome NSFW Content for you! 18+ ONLY!`
        )
        .addField(
          `**》UTILITIES**`,
          `\`${prefix}help utility\`\nSome Simple Utility Commands`
        )
        .setFooter(
          `Be sure to read our Privacy Policy before using the bot! Use =policy for more info!`
        )
        .setThumbnail(client.user.avatarURL())
        .setColor("GREEN");

      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "mod") {
      const embed1 = new Discord.MessageEmbed()
        .setTitle("Moderation Commands")
        .setDescription(
          "`kick`, `ban`, `softban`, `mute`, `unmute`, `tempmute`"
        )
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");
      return message.channel.send({ embeds: [embed1] });
    } else if (args[0] === "info") {
      const embed3 = new Discord.MessageEmbed()
        .setTitle("Info Commands")
        .setDescription(
          "`botinfo`, `devteam`, `emojiid`, `help`, `invite`, `ping`, `policy`, `report`, `userinfo`, `userid`, `serverinfo`, `suggest`"
        )
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

      return message.channel.send({ embeds: [embed3] });
    } else if (args[0] === "utility") {
      const embed4 = new Discord.MessageEmbed()
        .setTitle("Utility Commands")
        .setDescription(
          "`avatar`, `announce`, `clear`, `createrole`, `delchannel`, `delrole`, `enlargemoji`, `esay`, `giverole`, `google`, `imdb`, `lock`, `newtext`, `newvoice`, `nickname`, `poll`, `removerole`, `say`, `servericon`, `serverinfo`, `suggestion`, `unlock`, `weather`, `wiki`, `youtube`"
        )
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

      return message.channel.send({ embeds: [embed4] });
    } else if (args[0] === "fun") {
      const embed6 = new Discord.MessageEmbed()
        .setTitle("Fun Commands")
        .setDescription(
          "`8ball`, `ascii`, `clap`, `clyde`, `cowsay`, `dab`, `emojify`, `fliptext`, `greentext`, `hack`, `howgay`, `hug`, `joke`, `kill`, `orangetext`, `pokeimg`, `pp`, `respect`, `reverse`, `roast`, `slap`, `trivia`, `urban`, `vaportext`, `yomama`"
        )
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

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
          "`autorole`, `antilink`, `joinchannel`, `joinmessage`, `leavechannel`, `leavemessage` `prefix`"
        )
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

      return message.channel.send({ embeds: [embed9] });
    }
  },
};
