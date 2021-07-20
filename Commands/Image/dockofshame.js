const Discord = require("discord.js");

module.exports = {
    name: "dockofshame",
    permissions: ["SEND_MESSAGES"],
    aliases: ['dcofsh', 'dos'],
    cooldown: 3,
    description: "Image Manipulation Command",
    async execute(client, message, cmd, args, Discord) {
        const mention = message.mentions.members.first() || message.member;
        const avatar = mention.user.displayAvatarURL({ size: 2048, format: "png" });


        message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/dockofshame?user=${avatar}`, name: "reaperdockofshame.png" }] });
    }
}
