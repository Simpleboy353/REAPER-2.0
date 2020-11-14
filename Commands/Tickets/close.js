const Discord = module.require("discord.js");
const ms = require("ms")

module.exports = {
  name: "close",
  description: "Close a ticket in a server!",
  run: async(client, message, args)=>{
  if (message.channel.name.match("-ticket")) {
      let embed = new Discord.MessageEmbed()
      .setDescription("This ticket will be deleted in 5 seconds!")
      message.channel.send(embed)
      let time = '5s'
      setTimeout(function () {
        message.channel.delete()
      }, ms(time));
    } else {
    message.channel.send("This is not a ticket channel!")
  }
}
}