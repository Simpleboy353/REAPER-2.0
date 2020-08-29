const Discord = module.require("discord.js");

module.exports = {
    name: "cat",
    description: "Get Random cat images",
    run: async(client, message, args) => {
    const ino = Math.random(1,122);

    message.channel.send({files: [{attachment: `hhtps://api.hyrousek.tk/cat`, name: "cat.jpg"}]});
    }
}