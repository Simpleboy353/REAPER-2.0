const Discord = require("discord.js");

module.exports = {
    name: "h image",
    description: "Get Image Manipulation commands",
    run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Image Commands")
    .setDescription("`achievement`, `amazeme`, `amiajoke`, `bad`, `challenge`, `didyoumean`, `drake`, `facts`, `illegal`, `jokeoverhead`, `pornhub`, `scroll`, `textimage`");
    message.channel.send(embed);
   }
}
