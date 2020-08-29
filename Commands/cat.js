const Discord = module.require("discord.js");

module.exports = {
    name: "cat",
    description: "Get Random cat images",
    run: async(client, message, args) => {
    const ino = Math.random(1,122);
    const link = `https://api.hyrousek.tk/cat`;
    const embed = new Discord.MessageEmbed()
    .setTitle("Cats")
    .setImage(link)
    .setTimestamp();

    message.channel.send(embed);
    }
}