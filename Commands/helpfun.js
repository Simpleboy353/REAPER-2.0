const Discord = require("discord.js");

module.exports = {
    name: "helpfun",
    description: "Get Fun Commands",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .addField("Fun Commands", "`8ball`, `achievement`, `amazeme`, `amiajoke`, `ascii`, `bad`, `challenge`, `clap`, `cowsay`, `didyoumean`, `drake`, `emojify`, `facts`, `fliptext`, `howgay`, `illegal`, `jokeoverhead`, `kill`, `pornhub`, `reverse`, `roast`, `salty`, `scroll`, `slap`, `textimage`, `trivia`, `urban`, `vaportext`, `yomama`")
        .setColor("RANDOM");

        message.channel.send(embed);
    }
}