const Discord = require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (bot, message, args) => {
  var mention = message.mentions.members.first();
  if(!mention) return message.channel.send("Please mention someone to get their user info.")
  let usericon = mention.user.avatarURL;
  let bot = {
      "true": "The User is a Bot",
      "false": "The User is a Human"
    };
  const userlol = new Discord.MessageEmbed()
  .setTitle(`User Info`)
  .setThumbnail(usericon)
  .setColor("RANDOM")
  .addField(`Name: `, `**${mention.user.username}**`)
  .addField(`Tag: `, `**#${mention.user.discriminator}**`)
  .addField(`ID: `, `**${mention.user.id}**`)
  .addField(`Is Bot: `, `**bot[${mention.user.bot}]**`)
  .addField("Account created at: ", `**${mention.user.createdAt}**`)
  .addField("Joined This Server at: ", `**${mention.joinedAt}**`)
  message.channel.send(userlol)
}
}
