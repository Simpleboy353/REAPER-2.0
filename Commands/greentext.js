const Discord = module.require("discord.js");

module.exports = {
    name: "greentext",
    description: "Colors your text with green colour",
    run: async(client, message, args) => {
    if (!args) {
    return message.channel.send("You need to enter some text")
    }
    message.channel.send("```css \nargs.join(" ") \n```")
}
}
