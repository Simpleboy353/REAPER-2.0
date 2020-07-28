const Discord = require("discord.js");

module.exports = {
    name: "helpconfig",
    description: "Get list of Configuration commands",
    run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Configuration Commands", "`prefix`");
    message.channel.send(embed);
   }
}