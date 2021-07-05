const welcomeData = require("../../database/guildData/welcome");
const welcomemsg = require("../../database/guildData/joinmsg");

module.exports = async (member) => {
  const data = await welcomeData.findOne({
    GuildID: member.guild.id,
  });

  var data2 = await welcomemsg.findOne({
    GuildID: member.guild.id,
  });

  if (data && data2) {
    var channel = data.Welcome;

    var joinmessage = data2.JoinMsg;

    joinmessage = joinmessage.replace("{user.mention}", `${member}`);
    joinmessage = joinmessage.replace("{user.name}", `${member.user.tag}`);
    joinmessage = joinmessage.replace("{server}", `${member.guild.name}`);
    joinmessage = joinmessage.replace(
      "{membercount}",
      `${member.guild.memberCount}`
    );

    let embed20 = new MessageEmbed()
      .setDescription(joinmessage)
      .setColor("GREEN");
    member.guild.channels.cache.get(channel).send({ embeds: [embed20] });
  }

  if (data && !data2) {
    var channel = data.Welcome;

    let embed200 = new MessageEmbed()
      .setTitle("Welcome")
      .setDescription(
        `${member}, Welcome to **${member.guild.name}**! We hope you like our Server! Enjoy Your Stay here!`
      )
      .setFooter(`We are now ${member.guild.memberCount} members`)
      .setColor("GREEN");

    member.guild.channels.cache.get(channel).send({ embeds: [embed200] });
  }
};
