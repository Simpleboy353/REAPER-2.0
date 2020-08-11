const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  var mention = message.mentions.members.first();
  if(!mention) return message.channel.send("Please mention someone to get their user info.")
  let usericon = mention.user.avatarURL;
  const userlol = new Discord.MessageEmbed()
  .setTitle(`User Info`)
  .setThumbnail(usericon)
  .setColor("RANDOM")
  .addField(`Name: `, `**${mention.user.username}**`)
  .addField(`Tag: `, `**#${mention.user.discriminator}**`)
  .addField(`ID: `, `**${mention.user.id}**`)
  .addField(`Is Bot: `, `**${mention.user.bot}**`)
  .addField(`Roles: `, mention.roles.map(r => `${r}`).join(' | '))
  .addField("Account created at: ", `**${mention.user.createdAt}**`)
  .addField("Joined This Server at: ", `**${mention.joinedAt}**`)
  .setThumbnail(mention.user.avatarURL())
  message.channel.send(userlol)
}
}
