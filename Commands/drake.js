const Discord = module.require("discord.js");
const Jimp = require("jimp");
const cooldown = new Set();

module.exports = {
    name: "drake",
    description: "Another Fun Command",
    run: async(client, message, args) => {
            if (message.channel.type === "dm") return;
            let text = args[0];
            let text2 = args[1];
            if (!text) {
                return message.reply('You need to provide some text!');
            }
            message.channel.send({files : [{attachment: `https://api.alexflipnote.dev/drake?text=${text}&text2=${text2}`, name: 'file.jpg'}]})
    }
};