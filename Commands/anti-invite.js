const Discord = module.require("discord.js");

module.exports = {
   name: "anti-invite",
   description: "Prevent Users from Sending Invite Links",
   run: async(client, message, args) => {
   if (!message.member.hasPermission("ADMINISTRATOR") {
   return message.channel.send("Missing Permissions: `ADMINISTRATOR`")
   }
   if(client.settings.get(message.guild.id, "antiinvite")) {
   client.settings.set(message.guild.id, false, "antiinvite")
   message.reply('Disabled anti-invite.')
   return;
   } else if(!client.settings.get(message.guild.id, "antiinvite")) {
   client.settings.set(message.guild.id, true, "antiinvite")
   message.reply('Enabled anti-invite.')
   return;
   }
}
}
