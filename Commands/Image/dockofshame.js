const Discord = require("discord.js");

module.exports = {
    name: "dockofshame",
    permissions: ["SendMessages"],
    aliases: ['dcofsh', 'dos'],
    cooldown: 3,
    description: "Image Manipulation Command",
    run: async(client, message, args) => {
        const mention = message.mentions.users.first();
        if (!mention) return message.channel.send("Mention someone!");
        const avatar = mention.displayAvatarURL({ size: 2048, format: "png" });


        message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/dockofshame?user=${avatar}`, name: "reaperdockofshame.png" }] });
    }
}
