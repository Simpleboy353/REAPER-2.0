const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Get the bot's",
    run: async (client, message, args) => {

        let embed = new Discord.MessageEmbed()
        .setTitle("Get Bot's Invite Link")
        .setColor("RANDOM")
        .addField(`Here you go: `, "[Click Me to invite](https://discordapp.com/oauth2/authorize?client_id=733670294086221865&scope=bot&permissions=8&response_type=code)")
        .setFooter("Thanks for Inviting");
        message.channel.send(embed);
    }
}