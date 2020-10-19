const Discord = module.require("discord.js");

module.exports = {
    name: "dab",
    description: "Adds dab emoji after each word",
    run: async(client, message, args) => {
    if (!args.length) {
        return message.channel.send("`Usage: =dab <text>`")
        }
        message.channel.send(args.join(' ').replace(/ /g, ' <a:emoji_9:726786422866182186> '));
    }
}
