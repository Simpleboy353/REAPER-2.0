const discord = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["av"],
    category: "Utility",
    usage: "avatar/avatar @user",
    description: "Gives avatar for message author or mentioned user.",
    execute(message, args) {

let user = message.mentions.users.first() || message.author;
let embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .addField(`${user.username}'s Avatar`, `Avatar Link](user.avatarURL({size: 2048, dynamic: true, format: "png"}))`)
        .setImage(user.avatarURL({size: 2048, dynamic: true, format: "png"}))
        
    message.channel.send(embed)
     message.delete();
    },
};
