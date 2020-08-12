const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  const mention = message.mentions.members.last() || message.mention;
  const usericon = mention.user.avatarURL();
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
