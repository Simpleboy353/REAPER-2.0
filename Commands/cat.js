const Discord = module.require("discord.js");
const Jimp = require("jimp");
const cooldown = new Set();

module.exports = {
    name: "cat",
    description: "Another Fun Command",
    run: async(client, message, args) => {
            if (message.channel.type === "dm") return;
            message.channel.send({files : [{attachment: `https://api.alexflipnote.dev/cats`, name: 'file.jpg'}]})
    }
};
