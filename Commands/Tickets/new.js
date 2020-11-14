const Discord = module.require("discord.js");
const ticketData = require("../Owner/models/tickets")
const channelData = require("../Owner/models/tchannel")
const prefixData = require("../Owner/models/prefix")

module.exports = {
  name: "new",
  description: "Create a new ticket in the server!",
  run: async(client, message, args) => {
    const data2 = prefixData.findOne({
      GuildID: message.guild.id
    })
    if (data2) {
      var prefix = data2.Prefix
    } else if (!data) {
      prefix = "=";
    }
    const data = await ticketData.findOne({
      GuildID: message.guild.id
    })
    if (data) {
    const tchannel = message.guild.channels.create(`${message.author.tag}-ticket`, {
      type: 'text',
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL'],
          deny: ['READ_MESSAGE_HISTORY']
        },
        {
          id: message.author.id,
          allow: ['VIEW_CHANNEL'],
          allow: ["SEND_MESSAGES"],
          allow: ['READ_MESSAGE_HISTORY']
        },
        {
          id: data.Role,
          allow: ['VIEW_CHANNEL'],
          allow: ["SEND_MESSAGES"],
          allow: ['READ_MESSAGE_HISTORY']
        },
      ],
    }).then((ch, message)=> {
      ch.send(`Thanks for Creating a ticket, ${message.author}! Please be patient, Support will contact you shortly! To close this ticket, do \`${prefix}close\``)
      message.react(":white_check_mark:")

      let data2 = channelData.findOneAndUpdate({
        Channel: tchannel.id,
        UserID: message.author.id,
        GuildID: message.guild.id
      })
    });
  } else if (!data) {
    message.channel.send("There's no accessrole setup for this server!")
  }
  }
}