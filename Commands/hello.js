const Discord = module.require("discord.js");

module.exports = {
    name: "Hello",
    description: "Says Hello",
    run: async(client, message, args) => {
        message.channel.send(`/tts Hello`);
    }
}