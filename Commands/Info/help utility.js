const Discord = module.require("discord.js");

module.exports = {
  name: "help utility",
  description: "Get Utility Commands",
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle("Utility Commands")
      .setDescription("`addemoji`, `avatar`, `announce`, `clear`, `createrole`, `delchannel`, `delrole`, `emoji`, `emojiid`, `enlargemoji`, `esay`, `giverole`, `google`, `imdb`, `lock`, `newtext`, `newvoice`, `nickname`, `playstore`, `poll`, `react`, `removerole`, `say`, `servericon`, `suggestion`, `timedlockdown`, `unlock`, `weather`, `wiki`, `youtube`")
      .setColor("RANDOM");

    message.channel.send(embed)
  }
}