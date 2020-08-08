const Discord = module.require("discord.js");

module.exports = {
    name: "greentext",
    description: "Colors your text with green colour",
    run: async(client, message, args) => {
    const text = args.join(" ");
    if (!text) {
    return message.channel.send("You need to enter some text")
    }
    message.channel.send(`\`\`\`css\n${text}\n\`\`\``)
}
}
