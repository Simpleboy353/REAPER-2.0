const Discord = require("discord.js");

module.exports = {
    name: "helpconfig",
    description: "Get list of Configuration commands",
    run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Configuration Commands")
    .setDescription("`prefix`");
    message.channel.send(embed);
   }
}
