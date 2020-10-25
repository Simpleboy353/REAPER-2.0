const Discord = module.require("discord.js");
const mongoose = require("mongoose")
const prefixModel = require("../Owner/models/prefix");

mongoose.connect("mongodb+srv://Simpleboy353:rhtking123@cluster0.hcxzx.mongodb.net/Clustor0?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  name: "help",
  description: "Get the Command List",
  aliases: ["commands", "cmd", "h"],
  run: async(client, message, args) => {
    const avatar = client.user.avatarURL;
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });

    if (data) {
     var prefix = data.Prefix;
    } else if (!data) {
      //set the default prefix here
     var prefix = "=";
    }

    if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setThumbnail(avatar)
      .setTitle("Available Command Categories")
      .addField(`<:conf:748544324978999448> __**Configuration**__: `, `\`${prefix}help config\`\nConfigure the bot as per your server!`)
      .addField(`<a:ColorDino:726964382009131099> __**Fun**__: `, `\`${prefix}help fun\`\nHave some fun in your Server!`)
      .addField(`<:cam:748544442478100511> __**Image**__: `, `\`${prefix}help image\`\nManipulate Images with these commands`)
      .addField(`<:inf:748544269798866964> __**Info**__: `, `\`${prefix}help info\`\n Get some info relating the Server, users or our Bot`)
      .addField(`<:mod:748544387499294841> __**Moderation**__: `, `\`${prefix}help mod\`\nIssues relating some users? Use these Commands`)
      .addField(`<:music:761893108442071060> __**Music**__: `, `\`${prefix}help music\`\nRelax and listen to some music!\nNote: Music Commands work with the default prefix \`=\` only!`)
      .addField(`<:nsfw:768346751576440852> __**NSFW**__: `, `\`${prefix}help nsfw\`\nSome NSFW Content for you!`)
      .addField(`<:utility:748177830134808597> __**Utility**__: `, `\`${prefix}help utility\`\nSome Simple Utility Commands`)
      .setThumbnail(client.user.avatarURL())
      .setColor("RANDOM");

     return message.channel.send(embed);

  } else if (args[0] === "mod") {
      const embed1 = new Discord.MessageEmbed()
        .setTitle("Moderation Commands")
        .setDescription("`kick`, `ban`, `softban`, `mute`, `unmute`, `tempmute`, `massaddrole`, `massremoverole`, `slowmode`, `voicekick`, `voicemute`, `voiceunmute`, `voicemuteall`, `voiceunmuteall`, `deafen`, `undeafen`, `deafenall`, `undeafenall`")
        .setColor("RANDOM");
     return message.channel.send(embed1)

  } else if (args[0] === "music") {
      const embed2 = new Discord.MessageEmbed()
        .setTitle("Music Commands")
        .setDescription("`play [p]`, `pause`, `resume [r]`, `skip [s]`, `shuffle`, `skipto [st]`, `search`, `stop`, `queue [q]`, `np`, `playlist [pl]`, `volume`, `pruning`, `remove`, `lyrics [ly]`, `repeat [rep]`")
        .setFooter("Use = before each command!")
        .setColor("RANDOM");

      return message.channel.send(embed2)

  } else if (args[0] === "info") {
      const embed3 = new Discord.MessageEmbed()
        .setTitle("Info Commands")
        .setDescription("`botinfo`, `devteam`, `emojiid`, `help`, `invite`, `ping`, `report`, `userinfo`, `userid`, `serverinfo`, `suggest`")
        .setColor("RANDOM");

      return message.channel.send(embed3);

  } else if (args[0] === "utility") {
      const embed4 = new Discord.MessageEmbed()
        .setTitle("Utility Commands")
        .setDescription("`addemoji`, `avatar`, `announce`, `clear`, `createrole`, `delchannel`, `delrole`, `emoji`, `emojiid`, `enlargemoji`, `esay`, `giverole`, `google`, `imdb`, `lock`, `newtext`, `newvoice`, `nickname`, `playstore`, `poll`, `react`, `removerole`, `say`, `servericon`, `suggestion`, `timedlockdown`, `unlock`, `weather`, `wiki`, `youtube`")
        .setColor("RANDOM");

      return message.channel.send(embed4);

  } else if (args[0] === "config") {
      const embed5 = new Discord.MessageEmbed()
        .setTitle("Config Commands")
        .setDescription("`prefix`, `setwelcome`, `setbye`, `setmessagelogs`, `welcomeoff`, `byeoff`, `messagelogsoff`")
        .setFooter("New Commands Coming Soon!")
        .setColor("RANDOM");

      return message.channel.send(embed5);

  } else if (args[0] === "fun") {
      const embed6 = new Discord.MessageEmbed()
        .setTitle("Fun Commands")
        .setDescription("`8ball`, `ascii`, `clap`, `clyde`, `cowsay`, `dab`, `emojify`, `fliptext`, `gif`, `greentext`, `hack`, `howgay`, `hug`, `joke`, `kill`, `orangetext`, `pokeimg`, `pp`, `respect`, `reverse`, `roast`, `sacrifice`, `slap`, `spam`, `trivia`, `urban`, `vaportext`, `yomama`")
        .setColor("RANDOM");

      return message.channel.send(embed6);
  
    } else if (args[0] === "image") {
      const embed7 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Image Commands")
        .setDescription("`achievement`, `amazeme`, `amiajoke`, `bad`, `catsay`, `challenge`, `changemymind`, `creatememe`, `didyoumean`, `drake`, `facts`, `illegal`, `jokeoverhead`, `meme`, `phb`, `rip`, `scroll`, `tableflip`, `textimage`, `trash`, `trigger`, `trumptweet`, `wasted`, `wideavatar`");

      return message.channel.send(embed7);

    } else if (args[0] === "nsfw") {
      const embed8 = new Discord.MessageEmbed()
      .setTitle("NSFW Commands")
      .setDescription("`4k`, `anal`, `ass`, `blowjob`, `boobs`, `cumsluts`, `danbooru`, `hentai`, `milf`, `pussy`")
      .setColor("RANDOM")

      return message.channel.send(embed8);
    }
  }
}
