const Discord = module.require("discord.js");
const modData = require("../Owner/models/modlogs")
const messageData = require("../Owner/models/messages")
const autoroleData = require("../Owner/models/autorole")
const welcomeData = require("../Owner/models/welcome")
const byeData = require("../Owner/models/bye")
const prefixData = require("../Owner/models/prefix")
const JoinMsg = require("../Owner/models/joinmsg")
const ByeMsg = require("../Owner/models/byemsg")

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
    if (data6) {
      var serverprefix = data6.Prefix
    } else if (!data6) {
      serverprefix = "=";
    }
    const data7 = await JoinMsg.findOne({
      GuildID: message.guild.id
    })
      const data8 = await ByeMsg.findOne({
        GuildID: message.guild.id
      })
    const icon = message.guild.iconURL;
    const embed = new Discord.MessageEmbed()
    .setTitle(`Config Stats For **${message.guild.name}**`)
    .setDescription(`Do \`${serverprefix}help config\` to configure these!`)
    .setThumbnail(icon)
    .setFooter(`Requested by: ${message.author.username}`)
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    if (data6) {
      let prefix = data6.Prefix
      embed.addField(`Prefix`, `Custom Prefix in use: \`${prefix}\``)
    } else if (!data6) {
      embed.addField(`Prefix`, `Default Prefix in use: \`=\``)
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
    if (data7) {
      let joinmsg = data7.JoinMsg
      embed.addField(`Join Message`, `${joinmsg}`)
    } else if (!data7) {
      embed.addField(`Join Message`, `Not Set`)
    }
    if (data5) {
      let bchannel = data5.Bye
      embed.addField(`Leave Logs`, `State: Active\nChannel: <#${bchannel}>`)
    } else if (!data5) {
      embed.addField(`Leave Logs`, `State: Inactive`)
    }
      if (data8) {
        let byemsg = data7.ByeMsg
        embed.addField(`Leave Message`, `${byemsg}`)
      } else if (!data8) {
        embed.addField(`Leave Message`, `Not Set`)
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