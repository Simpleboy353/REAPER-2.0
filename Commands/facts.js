const Discord = module.require("discord.js");
const Jimp = require("discord.js");

module.exports = {
    name: "facts",
    description: "Another fun command",
    run: async(client, message, args) => {
        if (message.channel.type === "dm") return;
        let args1 = args.join(' ');
        let facts = `https://api.alexflipnote.dev/facts?=` + args1.toUpperCase();
        if (!args1) {
            return message.reply('Please Provide some text');
        }
        const emb = new Discord.MessageEmbed();
        emb.setImage(facts);
        message.channel.send({
            embed: emb
        }) 
    }
}