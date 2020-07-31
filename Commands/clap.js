const Discord = module.require("discord.js");

module.exports = {
    name: "clap",
    description: "Add clap emoji between each word",
    run: async(client, message, args) => {
        if (!args.length) {
        return message.channel.send("You need to enter some text")
        }
        message.channel.send(args.join(' ').replace(/ /g, ' 👏 '));
    }
}