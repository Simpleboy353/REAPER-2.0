const Discord = require("discord.js");

module.exports = {
    name: "giverole",
    description: "Give roles to users",
    run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have enough permissions");
        const user = message.mentions.members.first();
        if (!user) return message.channel.send("Please mention a user you want to give the role to");
        const name = args.slice(1).join(" ");
        if (!name) return message.channel.send("Please type the name of the role");
        const role = message.mentions.roles.first();
        if (!role) return message.channel.send("Couldn't find the Provided Role");
        await user.roles.add(role), message.channel.send(`${user} now has the ${role} role`)   
}
}
