const messageData = require("../Commands/Owner/models/messages")
module.exports = async (message) => {
  const data = await messageData.findOne({
    GuildID: message.guild.id
  })
  if (data) {

    if (message.author.bot) {
      return;
    }
    let embed = new MessageEmbed()
      .setTitle("🗑️ Message Deleted")
      .setDescription(`Message deleted in <#${message.channel.id}> by ${message.author}`)
      .addField(`Message Content`, message.content, true)
      .setTimestamp()
      .setColor("GREEN");

    let channel = data.Message

    message.guild.channels.cache.get(channel).send(embed);
  } else if (!data) {
    return;
  }
}