const Discord = module.require("discord.js");
const ticketData = require("../Owner/models/tickets")

module.exports = {
  name: "new",
  description: "Create a new ticket in the server!",
  run: async(client, message, args) => {
    const data = await ticketData.findOne({
      GuildID: message.guild.id
    })
    if (data) {
    message.guild.channels.create(`${message.author.tag}`, {
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
    }).then(ch=> {
      ch.send(`Thanks for Creating a ticket, ${message.author}! Please be patient, Support will contact you shortly!`)
    })
  } else if (!data) {
    message.channel.send("There's no accessrole setup for this server!")
  }
  }
}