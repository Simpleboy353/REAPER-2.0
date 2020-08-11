const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  var mention = message.mentions.members.first();
  const usericon = mention.user.avatarURL;
  if(!mention) return message.channel.send("Please mention someone to get their user info.")
  const userlol = new Discord.MessageEmbed()
  .setTitle(`User Info`)
  .setColor("RANDOM")
  .setThumbnail(usericon)
  .addField(`Name: `, `**${mention.user.username}**`)
  .addField(`Tag: `, `**#${mention.user.discriminator}**`)
  .addField(`ID: `, `**${mention.user.id}**`)
  .addField(`Is Bot: `, `**${mention.user.bot}**`)
  .addField("Account created On: ", `**${mention.user.createdAt}**`)
  .addField("Joined This Server On: ", `**${mention.joinedAt}**`)
  .setThumbnail(mention.user.avatarURL())
  message.channel.send(userlol)
}
}
