const Discord = module.require("discord.js");

module.exports = {
   name: "memberinfo",
   description: "Just for testing",
   run: async(client, message, args) => {
   const user = message.mentions.members.first() || message.author;
   const roles = user.roles.cache.get;
   const usericon = user.avatarURL;
   const userlol = new Discord.MessageEmbed()
   .setAuthor(`${user.tag}`, user.avatarURL())
   .setDescription(`${user}`)
   .addField(`Flags: `, `${user.flags.toArray()}`)
   .addField(`Is Bot: `, `${user.bot}`)
   .addField(`Roles: `, `${user._roles.join('>  <@&')}`)
   .addField(`Registered: `, `${user.createdAt}`)
   .addField(`Joined: `, `${user.joinedAt}`)
   .setFooter(`ID: ${user.id}`, user.avatarURL())
}
}
