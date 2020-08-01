const Discord = module.require("discord.js");
const Jimp = require("discord.js");

module.exports = {
    name: "facts",
    description: "Another fun command",
    run: async(client, message, args) => {
        if (message.channel.type === "dm") return;
        let factline = args.join(" ");
        let facts = `https://api.alexflipnote.dev/facts?text=` + factline.toUpperCase();
        if (!factline) {
            return message.channel.send('Please Provide some text');
        }
        const emb = new Discord.MessageEmbed();
        emb.setImage(facts);
        message.channel.send({
            embed: emb
        }) 
    }
}