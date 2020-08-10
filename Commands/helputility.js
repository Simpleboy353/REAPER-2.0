const Discord = require("discord.js");

module.exports = {
    name: "helputility",
    description: "Get Utility Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Utility Commands")
        .setDescription("`avatar`, `announce`, `clear`, `createrole`, `delchannel`, `giverole`, `lock`, `newtext`, `newvoice`, `nickname`, `poll`, `removerole`, `say`, `unlock`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}
