const Discord = module.require("discord.js");

module.exports = {
    name: "amiajoke",
    description: "Another fun command",
    run: async(client, message, args) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
    let link = `https://api.alexflipnote.dev/amiajoke?image=${avatar}`;

    if (!avatar) {
        return message.channel.send("`Usage: =amaiajoke <user>`")
        }
    const embed = new Discord.MessageEmbed()
    .setColor("#800080")
    .setImage(link);
    message.channel.send(embed);
    }
}