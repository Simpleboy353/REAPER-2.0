const Discord = require("discord.js");

module.exports = {
    name: "helpfun",
    description: "Get Fun Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .addField("Fun Commands", "`8ball`, `amazeme`, `ascii`, `cowsay`, `emojify`, `fliptext`, `kill`, `reverse`, `roast`, `trivia`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}