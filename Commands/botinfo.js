const Discord = require("discord.js");

module.exports = {
    name: "botinfo",
    description: "Shows the bot info",
    run: async (client, message, args) => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Bot Info")
        .setColor("RANDOM")
        .setDescription("**Bot Name: **REAPER 2.0 (BETA) \n**Owner: **๖ۣۜℜⱥjͥƤuͣtͫ#5915 \n**Total Categories: **6 \n**Total Commands: **57 \n**State :**Under Development \n**Online State: **Up 24/7 (Except during Maintenance)")
        .setFooter("Thanks, Reaper 2.0 Team");
        message.channel.send(embed);
    }
}
