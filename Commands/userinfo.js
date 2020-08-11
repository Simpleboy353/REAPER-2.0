const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  var member = message.mentions.members.first() || message.author;
  if(!mention) return message.channel.send("Please mention someone to get their user info.")
  let usericon = mention.user.avatarURL;
  const userlol = new Discord.MessageEmbed()
  .setTitle(`User Info`)
  .setThumbnail(usericon)
  .setColor("RANDOM")
  .addField(`Name: `, `**${member.user.username}**`)
  .addField(`Tag: `, `**#${member.user.discriminator}**`)
  .addField(`ID: `, `**${member.user.id}**`)
  .addField(`Is Bot: `, `**${member.user.bot}**`)
  .addField(`Roles: `,  member.roles.map(roles => `${roles}`).join(', '))
  .addField("Account created at: ", `**${member.user.createdAt}**`)
  .addField("Joined This Server at: ", `**${member.joinedAt}**`)
  .setThumbnail(member.user.avatarURL())
  message.channel.send(userlol)
}
}
