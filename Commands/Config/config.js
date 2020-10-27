const Discord = module.require("discord.js");
const prefix = require("../Owner/models/prefix")
const welcome = require("../Owner/models/welcome");
const bye = require("../Owner/models/bye");
const messageLogs = require("../Owner/models/messages");

module.exports = {
  name: "config",
  description: "Get the stats for your server!",
  run: async(client, message, args) => {
   const prefixData = await prefix.findOne({
     GuildID: message.guild.id
   })

    const welcomeData = await welcome.findOne({
      GuildID: message.guild.id
    })

    const byeData = await bye.findOne({
      GuildID: message.guild.id
    })

    const messageData = await messageLogs.findOne({
      GuildID: message.guild.id
    })
    if (prefixData) {
      var serverprefix = prefixData.Prefix
    } else {
      serverprefix = "=";
    }
    if (welcomeData) {
      var welcomechannel = welcomeData.Welcome
    } else {
      welcomechannel = "None";
    }
    if (byeData) {
      var byechannel = byeData.Bye
    } else {
      byechannel = "None";
    }
    if (messageData) {
      var messagelogs = messageData.Message
    } else {
      messagelogs = "None";
    }

    let embed = new Discord.MessageEmbed()
    .setTitle("Config Stats")
    .setDescription(`
Prefix: \`${serverprefix}\`
Join Channel: <#${welcomechannel}>
Leave Channel: <#${byechannel}>
Message Logs: <#${messagelogs}>`)
  }
}