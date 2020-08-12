const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, [target]) => {
  const mention = message.mentions.members.last() || message.guild.cache.get(target) || message.member;
  const roles = member.roles.cache
  .sort((a, b) => b.postion - a.position)
  .map(role => role.toString())
  .slice(0, -1);
  const usericon = mention.user.avatarURL;
  const userlol = new Discord.MessageEmbed()
  .setTitle(`User Info`)
  .setColor("RANDOM")
  .setThumbnail(usericon)
  .addField(`Name: `, `**${mention.user.username}**`)
  .addField(`Tag: `, `**#${mention.user.discriminator}**`)
  .addField(`ID: `, `**${mention.user.id}**`)
  .addField(`Is Bot: `, `**${mention.user.bot}**`)
  .addField(`Roles [${roles.length}]: `, `${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : None`)
  .addField("Account created On: ", `**${mention.user.createdAt}**`)
  .addField("Joined This Server On: ", `**${mention.joinedAt}**`)
  .setThumbnail(mention.user.avatarURL())
  message.channel.send(userlol)
}
}
