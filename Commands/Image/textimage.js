const Discord = module.require("discord.js");
const Jimp = require("jimp");
const cooldown = new Set();

module.exports = {
    name: "textimage",
    description: "Another Fun Command",
    run: async(client, message, args) => {
            if (message.channel.type === "dm") return;
            let text = args.join(" ");
            if (!text) {
                return message.reply('You need to provide some text!');
            }
            message.channel.send({files : [{attachment: `https://api.alexflipnote.dev/supreme?text=${text}`, name: 'file.jpg'}]})
       message.delete();
    }
};
