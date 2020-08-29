const Discord = module.require("discord.js");

module.exports = {
    name: "cat",
    description: "Get Random cat images",
    run: async(client, message, args) => {
    const state = "disabled";
    if (state === "disabled") {
    message.channel.send("The command has been disabled for now!")
    }
    const ino = Math.random(1,122);

    message.channel.send({files: [{attachment: `https://api.hyrousek.tk/fox`, name: "cat.jpg"}]});
    }
}