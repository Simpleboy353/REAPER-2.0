const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  const mention = message.mentions.members.first();
  if (!mention) {
  return message.channel.send("Please Mention Someone")
  }
  const roles = mention.roles.cache.get;
  const perms = mention.permissions;
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
  .setTitle(`**${mention.user.tag}**`)
  .setColor("RANDOM")
  .setThumbnail(usericon)
  .addField(`Flags: `, flags[mention.user.flags.toArray()])
  .addField(`Is Bot: `, bot[mention.user.bot])
  .addField(`Roles: `, `<@&${mention._roles.join('> <@&')}>`)
  .addField("Account created On: ", `${mention.user.createdAt}`)
  .addField("Joined This Server On: ", `${mention.joinedAt}`)
  .setThumbnail(mention.user.avatarURL())
  .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
 message.channel.send(userlol)
}
}
