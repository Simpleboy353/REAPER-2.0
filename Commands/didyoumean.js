const Discord = module.require("discord.js");
const Jimp = require("jimp");
const cooldown = new Set();

module.exports = {
    name: "didyoumean",
    description: "Another Fun Command",
    run: async(client, message, args) => {
            if (message.channel.type === "dm") return;
            let text = args[0];
            let text2 = args[1];
            if (!text) {
                return message.reply('`Usage: =didyoumean <msg1> <msg2>`');
            }
            message.channel.send({files : [{attachment: `https://api.alexflipnote.dev/didyoumean?top=${text}&bottom=${text2}`, name: 'file.jpg'}]})
    }
};