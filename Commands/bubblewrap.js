const Discord = module.require("discord.js");

module.exports = {
    name: "bubblewrap",
    description: "Send a wrapped message",
    run: async(client, message, args) => {
    if (!args[0]) {
    return message.channel.send("You need to enter at least one word and not more than 20 words")
    }
    await message.channel.send(`||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O|| ||O||`);
    }
}