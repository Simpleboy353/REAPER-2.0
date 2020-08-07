const Discord = module.require("discord.js");

module.exports = {
    name: "emojiid",
    description: "Get ID of emojis",
    run: async (client, message, args) => {
        const name = args.join(" ");
        const emoji = message.guild.emojis.cache.find(r => r.name === name);
        if (!emoji) {
        return message.channel.send("Please type the name of an emoji");
        }
        message.channel.send(````${emoji}````)
}
}
