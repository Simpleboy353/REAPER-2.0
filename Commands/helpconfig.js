const Discord = require("discord.js");

module.exports = {
    name: "helpconfig",
    description: "Get list of Configuration commands",
    run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .addField("Configuration Commands", "`prefix`");
    message.chanel.send(embed);
   }
}