const Discord = module.require("discord.js");

module.exports = {
    name: "trash",
    description: "Another fun command",
    run: async(client, message, args) => {
    let face = message.author();
    let trash = message.mentions.members.first();
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
