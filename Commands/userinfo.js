const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  const mention = message.mentions.members.first() || message.member;
  const perms = mention.permissions.cache.get === null ? "None" : mention.permissions.cache.get;
  const roles = mention.roles.cache.get === null ? "None" : mention.roles.cache.get;
  const usericon = mention.user.avatarURL;
  var flags = {
   "": "None",
   "DISCORD_EMPLOYEE": "Discord Employee",
   "DISCORD_PARTNER": "Discord Partner",
   "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
   "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
   "HYPESQUAD_EVENTS": "Hypesquad Events",
   "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
   "HOUSE_BRAVERY": "HypeSquad Bravery",
   "HOUSE_BALANCE": "HypeSquad Balance",
   "EARLY_SUPPORTER": "Early Supporter",
   "TEAM_USER": "Team User",
   "VERIFIED_BOT": "Verified Bot",
   "VERIFIED_DEVELOPER": "Verified Bot Developer"
              };
  var bot = {
     "true": "Yes, The User is a Bot",
     "false": "No, The User is a Human"
        };
  const userlol = new Discord.MessageEmbed()
  .setAuthor(`**${mention.user.tag}**`, mention.user.avatarURL())
  .setColor("RANDOM")
  .setThumbnail(usericon)
  .setDescription (`${mention}`)
  .addField(`Flags: `, flags[mention.user.flags.toArray().join(', ')])
  .addField(`Is Bot: `, bot[mention.user.bot])
  .addField(`Roles: `, `<@&${mention._roles.join('>  <@&')}>`)
  .addField(`Permissions: `, `${perms.join(", ")}`)
  .addField("Account created On: ", `${mention.user.createdAt}`)
  .addField("Joined This Server On: ", `${mention.joinedAt}`)
  .setThumbnail(mention.user.avatarURL())
  .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
  .setTimestamp()
 message.channel.send(userlol)
}
}
