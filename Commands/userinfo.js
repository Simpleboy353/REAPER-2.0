const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  var member = message.mentions.members.first() || message.member,
  user = member.user;
  if(!member) return message.channel.send("Please mention someone to get their user info.")
  const userlol = new Discord.MessageEmbed()
  .setTitle(`User Info`)
  .setColor("RANDOM")
  .addField(`Name: `, `**${user.displayName}**`)
  .addField(`Tag: `, `**#${user.discriminator}**`)
  .addField(`ID: `, `**${user.id}**`)
  .addField(`Is Bot: `, `**${user.bot}**`)
  .addField(`Roles: `, member.roles.map(roles => `${roles}`).join(' | '))
  .addField("Account created On: ", `**${user.createdAt}**`)
  .addField("Joined This Server On: ", `**${user.joinedAt}**`)

  message.channel.send(userlol)
}
}
