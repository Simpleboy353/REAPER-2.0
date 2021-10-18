const byeData = require("../../database/guildData/leavechannel");
const byemsg = require("../../database/guildData/leavemessage");
const { MessageEmbed } = require('discord.js')

module.exports = async (member) => {
 const avatar = member.user.avatarURL;

 const data = await byeData.findOne({
   GuildID: member.guild.id,
 });
 if (data) {
   const data2 = await byemsg.findOne({
     GuildID: member.guild.id,
   });
   if (data2) {
     var leavemessage = data2.ByeMsg;

     leavemessage = leavemessage.replace("{user.mention}", `${member}`);
     leavemessage = leavemessage.replace("{user.name}", `${member.user.tag}`);
     leavemessage = leavemessage.replace("{server}", `${member.guild.name}`);
     leavemessage = leavemessage.replace(
       "{membercount}",
       `${member.guild.memberCount}`
     );

     let embed = new MessageEmbed()
       .setDescription(`${leavemessage}`)
       .setColor("GREEN");

     let channel = data.Bye;

     member.guild.channels.cache.get(channel).send({embeds: [embed]});
   } else if (!data2) {
     let embed2 = new MessageEmbed()
       .setTitle("Goodbye")
       .setThumbnail(member.user.avatarURL())
       .setDescription(
         `**${member.user.tag}** just left the server! We hope they return back soon!`
       )
       .setFooter(`We now have ${member.guild.memberCount} members!`)
       .setThumbnail(member.user.avatarURL())
       .setColor("GREEN");

     let byechannel = data.Bye;

     member.guild.channels.cache.get(byechannel).send({embeds: [embed2]});
   }
 }
};
