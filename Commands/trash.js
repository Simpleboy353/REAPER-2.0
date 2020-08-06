const Discord = module.require("discord.js");

module.exports = {
    name: "trash",
    description: "Another fun command",
    run: async(client, message, args) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
    if (!avatar) {
    return message.channel.send("You need to mention Someone")
    }
    let link = `https://api.alexflipnote.dev/trash?face=${avatar}&trash=${avatar}`;
    const embed = new Discord.MessageEmbed()
    .setColor("#800080")
    .setImage(link);
    message.channel.send(embed);
    }
}
