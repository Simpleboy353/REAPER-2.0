const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Get the bot's",
    run: async (client, message, args) => {

        let embed = new Discord.MessageEmbed()
        .setTitle("Invite Me")
        .setColor("RANDOM")
        .setDescription("**Thanks for Inviting Infinity**\n**Get Inifinity's Invite Link [Here](https://discord.com/oauth2/authorize?client_id=733670294086221865&permissions=8&scope=bot)**")
        .setFooter(`Requested By: ${message.author.username}`);
        message.channel.send(embed);
    }
}
