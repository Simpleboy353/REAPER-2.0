const Discord = module.require("discord.js");

module.exports = {
    name:"userinfo",
  run: async (client, message, args) => {
  const mention = message.mentions.members.first();
  if (!mention) {
  return message.channel.send("Please Mention Someone")
  }
  const usericon = mention.user.displayAvatarURL({dynamic: true, size: 512});
  var flags = {
   "DISCORD_EMPLOYEE": "Discord Employee",
   "DISCORD_PARTNER": "Discord Partner",
   "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
   "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
   "HYPESQUAD_EVENTS": "Hypesquad Events",
   "HOUSE_BRILLIANCE": "House of Brilliance",
   "HOUSE_BRAVERY": "House of Bravery",
   "HOUSE_BALANCE": "House of Balance",
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
  .setTitle(`User Info`)
  .setColor("RANDOM")
  .setThumbnail(usericon)
  .addField(`Name: `, `${mention.user.username}`)
  .addField(`Tag: `, `#${mention.user.discriminator}`)
  .addField(`ID: `, `${mention.user.id}`)
  .addField(`Is Bot: `, bot[mention.user.bot])
  .addField(`Flags: `, flags[mention.user.flags.toArray()])
  .addField("Account created On: ", `${mention.user.createdAt}`)
  .addField("Joined This Server On: ", `${mention.joinedAt}`)
  .setThumbnail(mention.user.displayAvatarURL({dynamic: true, size: 512}))
  message.channel.send(userlol)
}
}
