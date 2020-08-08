const Discord = require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (bot, message, args) => {
  var mention = message.mentions.members.first() || message.member();
  if(!mention) return message.channel.send("Please mention someone to get their user info.")
  const userlol = new Discord.MessageEmbed()
  .setTitle(`User Info`)
  .setThumbnail(`${mention.user.AvatarURL}`)
  .setColor("RANDOM")
  .addField(`**Name: **`, `${mention.user.username}`)
  .addField(`**Tag: **`, `${mention.user.discriminator}`)
  .addField(`**ID: **`, `${mention.user.id}`)
  .addField(`**Is Bot: **`, `${mention.user.bot}`)
  .addField("**Account created at: **", `${mention.user.createdAt}`)
  .addField("**Joined This Server at: **", `${mention.joinedAt}`)
  message.channel.send(userlol)
  console.log(`USERINFO command from ${message.author.username} USER ID= ${message.author}`)
}
}
