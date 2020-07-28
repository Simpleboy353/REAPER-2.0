const Discord = require("discord.js");

module.exports = {
    name: "botinfo",
    description: "Shows the bot info",
    run: async (client, message, args) => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Bot Info")
        .setColor("RANDOM")
        .setDescription("Hello \nI am a multi-purpose Discord bot made by **_๖ۣۜℜⱥjͥƤuͣtͫ_#5915**. I am still under development and my developer is constantly adding new features to me. If you have any ques or wanna report any bug to dm my Developer.")
        .setFooter("Thanks, Reaper 2.0 Team");
        message.channel.send(embed);
    }
}