const Discord = module.require("discord.js");
const Jimp = require("jimp");
const cooldown = new Set();

module.exports = {
    name: "achievement",
    description: "Another Fun Command",
    run: async(client, message, args) => {
            if (message.channel.type === "dm") return;
            let text = args.join(" ");
            if (!text) {
                return message.reply('`Usage: =achievement <txt>`');
            }
            message.channel.send({files : [{attachment: `https://api.alexflipnote.dev/achievement?text=${text}`, name: 'file.jpg'}]})
    }
};