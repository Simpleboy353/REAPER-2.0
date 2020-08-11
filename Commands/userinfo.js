const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  var member = message.mentions.members.first() || message.author;
  user = member.user;
  if(!member) return message.channel.send("Please mention someone to get their user info.")
  const userlol = new Discord.MessageEmbed()
  .setTitle(`User Info`)
  .setColor("RANDOM")
  .addField(`Name: `, `**${member.user.username}**`)
  .addField(`Tag: `, `**#${member.user.discriminator}**`)
  .addField(`ID: `, `**${member.user.id}**`)
  .addField(`Is Bot: `, `**${member.user.bot}**`)
  .addField(`Roles: `,  user.roles ? user.roles.map(roles => `${roles}`).join(', '))
  .addField("Account created at: ", `**${member.user.createdAt}**`)
  .addField("Joined This Server at: ", `**${member.joinedAt}**`)

  message.channel.send(userlol)
}
}
