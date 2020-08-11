const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  var mention = message.mentions.members.first() || message.author;
  const usericon = mention.user.displayAvatarURL;
  if(!mention) return message.channel.send("Please mention someone to get their user info.")
  const userlol = new Discord.MessageEmbed()
  .setTitle(`User Info`)
  .setColor("RANDOM")
  .addField(`Name: `, `**${mention.user.displayName}**`)
  .addField(`Tag: `, `**#${mention.user.discriminator}**`)
  .addField(`ID: `, `**${mention.user.id}**`)
  .addField(`Is Bot: `, `**${mention.user.bot}**`)
  .addField("Account created On: ", `**${mention.user.createdAt}**`)
  .addField("Joined This Server On: ", `**${mention.joinedAt}**`)
  .setThumbnail(mention.user.displayAvatarURL())
  message.channel.send(userlol)
}
}
