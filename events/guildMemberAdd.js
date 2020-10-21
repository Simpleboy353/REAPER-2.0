const Discord = require("discord.js");
const memberData = require("../Commands/Owner/models/welcome")

module.exports=async(member, message)=> {
  const data = await memberData.findOne({
    GuildID: message.guild.id
  })
  if (data) {
    let memberData = data.Welcome
  let embed = new Discord.MessageEmbed()
  .setTitle("welcome!")
  .setDescription(`Welcome to the Server, ${member}! Hope you like our Server!`)
  .setColor("GREEN")

  return member.guilds.channels.cache.get(memberData).send(embed);
  } else if (!data) {
  return;
  }
}