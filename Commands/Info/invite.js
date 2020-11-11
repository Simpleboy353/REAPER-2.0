const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Get the bot's",
    run: async (client, message, args) => {

        let embed = new Discord.MessageEmbed()
        .setTitle("Invite Me")
        .setColor("RANDOM")
            .setDescription("**Get Infinity's Invite Link [Here](https://discord.com/oauth2/authorize?client_id=733670294086221865&permissions=1584921983&scope=bot)**\n**Need assistance? Join our [Support Server](https://discord.gg/mqWprFc) now!**")
        .setFooter(`Requested By: ${message.author.username}`);
        message.channel.send(embed);
    }
}
