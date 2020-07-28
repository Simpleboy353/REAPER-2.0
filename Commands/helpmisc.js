const Discord = require("discord.js");

module.exports = {
    name: "helpmisc",
    description: "Get of Miscellaneous commands",
    run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Miscellaneous Commands", "`Available after testing`");
    message.channel.send(embed);
   }
}