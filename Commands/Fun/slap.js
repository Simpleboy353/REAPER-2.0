const Discord = module.require("discord.js");

module.exports = {
    name: "slap",
    description: "Slaps a user",
    run: async(client, message, args) => {
        let member = message.mentions.members.first();
        if (!member) {
        return message.channel.send("You need a mention a user")
        }
        await message.channel.send({embed: {
            color: 3447003,
            title: message.author.username + " slapped :raised_back_of_hand: " + member.displayName + ", " + member.displayName + " is now in the hospital! :hospital:"
        }});
    }
}