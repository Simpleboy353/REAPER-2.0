const Discord = module.require("discord.js");
const modData = require("../Owner/models/modlogs")
const messageData = require("../Owner/models/messages")
const autoroleData = require("../Owner/models/autorole")
const welcomeData = require("../Owner/models/welcome")
const byeData = require("../Owner/models/bye")
const prefixData = require("../Owner/models/prefix")

module.exports = {
  name: "config",
  description: "Get the config stats for your Server",
  run: async(client, message, args)=> {
    if (args[0] === "stats") {
    const data1 = await modData.findOne({
      GuildID: message.guild.id
    })
    const data2 = await messageData.findOne({
      GuildID: message.guild.id
    })
    const data3 = await autoroleData.findOne({
      GuildID: message.guild.id
    })
    const data4 = await welcomeData.findOne({
      GuildID: message.guild.id
    })
    const data5 = await byeData.findOne({
      GuildID: message.guild.id
    })
    const data6 = await prefixData.findOne({
      GuildID: message.guild.id
    })
    const icon = message.guild.iconURL;
    const embed = new Discord.MessageEmbed()
    .setTitle(`Config Stats For **${message.guild.name}**`)
    .setThumbnail(icon)
    .setFooter(`Do =help config to configure these`)
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL())
    if (data6) {
      let prefix = data6.Prefix
      embed.setDescription(`Prefix: ${prefix}`)
    } else if (!data6) {
      embed.setDescription(`Prefix: \`=\``)
    }
    if (data3) {
      let autorole = data3.Role
      embed.addField(`Autorole`, `State: Active\nRole: <@&${autorole}>`)
    } else if (!data3) {
      embed.addField(`Autorole`, `State: Inactive`)
    }
    if (data4) {
      let jchannel = data4.Welcome
      embed.addField(`Join Logs`, `State: Active\nChannel: <#${jchannel}>`)
    } else if (!data4) {
    embed.addField(`Join Logs`, `State: Inactive`)
    }
    if (data5) {
      let bchannel = data5.Bye
      embed.addField(`Leave Logs`, `State: Active\nChannel: <#${bchannel}>`)
    } else if (!data5) {
      embed.addField(`Leave Logs`, `State: Inactive`)
    }
    if (data1) {
      let modlogs = data1.Mod
      embed.addField(`Modlogs`, `State: Active\nChannel: <#${modlogs}>`)
    } else if (!data1) {
      embed.addField(`Modlogs`, `State: Inactive`)
    }
    if (data2) {
      let messagelogs = data2.Message
      embed.addField(`Message Logs`, `State: Active\nChannel: <#${messagelogs}>`)
    } else if (!data2) {
      embed.addField(`Message Logs`, `State: Inactive`)
    }
    return message.channel.send(embed);
  } else if (!args[0]) return;
  }
}