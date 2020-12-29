const Discord = module.require("discord.js");
module.exports = {
  name: "help",
  description: "Get the Command List",
  aliases: ["commands", "cmd", "h"],
  run: async(client, message, args) => {
    const avatar = client.user.avatarURL;
    const prefix = "=";
    if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setThumbnail(avatar)
      .setTitle("Available Command Categories")
      .addField(`**》FUN**`, `\`${prefix}help fun\`\nHave some fun in your Server!`)
      .addField(`**》IMAGE**`, `\`${prefix}help image\`\nManipulate Images with these Commands!`)
      .addField(`**》INFORMATION**`, `\`${prefix}help info\`\nGet some info relating the Server, users or our Bot`)
      .addField(`**》MODERATION**`, `\`${prefix}help mod\`\nIssues relating some users? Use these Commands`)
      .addField(`**》MUSIC**`, `\`${prefix}help music\`\nRelax and listen to some music!`)
      .addField(`**》NSFW**`, `\`${prefix}help nsfw\`\nSome NSFW Content for you! 18+ ONLY!`)
      .addField(`**》UTILITIES**`, `\`${prefix}help utility\`\nSome Simple Utility Commands`)
      .setFooter(`Be sure to read our Privacy Policy before using the bot! Use =policy for more info!`)
      .setThumbnail(client.user.avatarURL())
      .setColor("GREEN");

     return message.channel.send(embed);

  } else if (args[0] === "mod") {
      const embed1 = new Discord.MessageEmbed()
        .setTitle("Moderation Commands")
        .setDescription("`kick`, `ban`, `softban`, `mute`, `unmute`, `tempmute`, `warn`, `checkwarns`, `massaddrole`, `massremoverole`, `slowmode`, `voicekick`, `voicemute`, `voiceunmute`, `voicemuteall`, `voiceunmuteall`, `deafen`, `undeafen`, `deafenall`, `undeafenall`")
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");
     return message.channel.send(embed1)

  } else if (args[0] === "music") {
      const embed2 = new Discord.MessageEmbed()
        .setTitle("Music Commands")
        .setDescription("`play [p]`, `pause`, `resume [r]`, `skip [s]`, `shuffle`, `skipto [st]`, `search`, `stop`, `queue [q]`, `np`, `playlist [pl]`, `volume`, `pruning`, `remove`, `lyrics [ly]`, `repeat [rep]`")
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

      return message.channel.send(embed2)

  } else if (args[0] === "info") {
      const embed3 = new Discord.MessageEmbed()
        .setTitle("Info Commands")
        .setDescription("`botinfo`, `devteam`, `emojiid`, `help`, `invite`, `ping`, `policy`, `report`, `userinfo`, `userid`, `serverinfo`, `suggest`")
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

      return message.channel.send(embed3);

  } else if (args[0] === "utility") {
      const embed4 = new Discord.MessageEmbed()
        .setTitle("Utility Commands")
        .setDescription("`addemoji`, `avatar`, `announce`, `clear`, `createrole`, `delchannel`, `delrole`, `emoji`, `emojiid`, `enlargemoji`, `esay`, `giverole`, `google`, `imdb`, `lock`, `newtext`, `newvoice`, `nickname`, `playstore`, `poll`, `react`, `removerole`, `say`, `servericon`, `suggestion`, `timedlockdown`, `unlock`, `weather`, `wiki`, `youtube`")
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

      return message.channel.send(embed4);

  } else if (args[0] === "fun") {
      const embed6 = new Discord.MessageEmbed()
        .setTitle("Fun Commands")
        .setDescription("`8ball`, `ascii`, `clap`, `clyde`, `cowsay`, `dab`, `emojify`, `fliptext`, `greentext`, `hack`, `howgay`, `hug`, `joke`, `kill`, `orangetext`, `pokeimg`, `pp`, `respect`, `reverse`, `roast`, `slap`, `trivia`, `urban`, `vaportext`, `yomama`")
        .setFooter(`Use ${prefix} before each command!`)
        .setColor("RANDOM");

      return message.channel.send(embed6);
  
    } else if (args[0] === "image") {
      const embed7 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Image Commands")
        .setDescription("`achievement`, `amazeme`, `amiajoke`, `bad`, `catsay`, `challenge`, `changemymind`, `creatememe`, `didyoumean`, `drake`, `facts`, `illegal`, `jokeoverhead`, `meme`, `phb`, `rip`, `scroll`, `tableflip`, `textimage`, `trash`, `trigger`, `trumptweet`, `wasted`, `wideavatar`")
        .setFooter(`Use ${prefix} before each command!`);

      return message.channel.send(embed7);

    } else if (args[0] === "nsfw") {
      const embed8 = new Discord.MessageEmbed()
      .setTitle("NSFW Commands")
      .setDescription("`4k`, `anal`, `ass`, `blowjob`, `boobs`, `cumsluts`, `danbooru`, `hentai`, `milf`, `pussy`")
      .setFooter(`Use ${prefix} before each command!`)
      .setColor("RANDOM")

      return message.channel.send(embed8);
    }
  }
}
