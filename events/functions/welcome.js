const welcomeData = require("../../database/guildData/welcome");
const welcomemsg = require("../../database/guildData/joinmsg");
const { MessageEmbed } = require('discord.js')

module.exports = async (member) => {
 const avatar = member.user.avatarURL;

 const data = await welcomeData.findOne({
   GuildID: member.guild.id,
 });
 if (data) {
   const data2 = await welcomemsg.findOne({
     GuildID: member.guild.id,
   });
   if (data2) {
     var joinmessage = data2.JoinMsg;

     joinmessage = joinmessage.replace("{user.mention}", `${member}`);
     joinmessage = joinmessage.replace("{user.name}", `${member.user.tag}`);
     joinmessage = joinmessage.replace("{server}", `${member.guild.name}`);
     joinmessage = joinmessage.replace(
       "{membercount}",
       `${member.guild.memberCount}`
     );

     let embed = new MessageEmbed()
       .setDescription(joinmessage)
       .setColor("GREEN");

     let channel = data.Welcome;

     member.guild.channels.cache.get(channel).send({embeds: [embed]});
     
   } else if (!data2) {
     let embed2 = new MessageEmbed()
     .setTitle("Welcome")
      .setDescription(
        `${member}, Welcome to **${member.guild.name}**! We hope you like our Server! Enjoy Your Stay here!`
      )
      .setFooter(`We are now ${member.guild.memberCount} members`)
      .setColor("GREEN");
     
     let channel = data.Welcome

    member.guild.channels.cache.get(channel).send({ embeds: [embed2] });
   }
 }
};
