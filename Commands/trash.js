const Discord = module.require("discord.js");

module.exports = {
    name: "trash",
    description: "Another fun command",
    run: async(client, message, args) => {
    let face = message.mentions.members.first()  message.guild.members.cache.get(args[0])  message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) : message.guild.members.cache.find(r => r.displayName === args[0].toLocaleLowerCase());
    let trash = message.mentions.members.first(2)[1]  message.guild.members.cache.get(args[1])  message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[1].toLocaleLowerCase()) : message.guild.members.cache.find(r => r.displayName === args[1].toLocaleLowerCase());
    if (!trash) {
    return message.channel.send("You need to mention Someone")
    }
    let avatar1 = face.user.displayAvatarURL({ format: 'png', dynamic: true, size: 512 });
    let avatar2 = trash.user.displayAvatarURL({ format: 'png', dynamic: true, size: 512 });
    let link = `https://api.alexflipnote.dev/trash?face=${avatar1}&trash=${avatar2}`;
    const embed = new Discord.MessageEmbed()
    .setColor("#800080")
    .setImage(link);
    message.channel.send(embed);
    }
}
