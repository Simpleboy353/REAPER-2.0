const Discord = module.require("discord.js");

module.exports = {
    name: "catsay",
    description: "Make the cat say your message",
    run: async(client, message, args) => {
    message.delete();
    const state = "enabled";
    if (state === "disabled") {
    return message.channel.send("Command has been disabled for now");
    }
    const msg = args.join(" ");
    if (!msg) {
    return message.channel.send("What you want the cat to say?");
    }
    message.channel.send({files: [{attachment: `https://cataas.com/cat/cute/says/${msg}`, name: "catsay.png"}]});
    }
}