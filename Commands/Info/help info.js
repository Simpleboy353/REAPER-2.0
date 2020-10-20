const Discord = module.require("discord.js");

module.exports = {
   name: "help info",
   description: "Get Info Commands",
   run : async(client, message, args) => {
     const embed = new Discord.MessageEmbed()
       .setTitle("Info Commands")
       .setDescription("`botinfo`, `devteam`, `emojiid`, `help`, `invite`, `ping`, `report`, `userinfo`, `userid`, `serverinfo`, `suggest`")
       .setColor("RANDOM");

       message.channel.send(embed);
   }
}