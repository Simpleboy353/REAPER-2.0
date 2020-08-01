const Discord = module.require("discord.js");
const Jimp = require("jimp");
const cooldown = new Set();

module.exports = {
    name: "illegal",
    description: "Provide a text to Trump for making it illegal",
    run: async(client, message, args) => {
            if (message.channel.type === "dm") return;
            let text = args.join(' ');
            let scroll = `https://api.alexflipnote.dev/scroll?text=${text}` + `.png`;
            if (!text) {
                return message.reply('You need to provide some text!');
            }
            const emb = new Discord.MessageEmbed();
            emb.setImage(scroll);
            message.channel.send({
                embed: emb
            })
    }
};