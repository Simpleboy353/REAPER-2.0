const Discord = module.require("discord.js");

module.exports = {
    name: "jokeoverhead",
    description: "Another fun command",
    run: async(client, message, args) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
    let link = `https://api.alexflipnote.dev/jokeoverhead?image=${avatar}`;

    if (!avatar) {
        return message.channel.send("You need to mention someone")
        }
    const embed = new Discord.MessageEmbed()
    .setColor("#800080")
    .setImage(link);
    message.channel.send(embed);
    }
}