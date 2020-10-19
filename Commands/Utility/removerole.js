const Discord = require("discord.js");

module.exports = {
    name: "removerole",
    description: "Take roles from users",
    run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have enough permissions");
        const user = message.mentions.members.first();
        if (!user) return message.channel.send("Please mention a user you want to take the role from");
        const role = message.mentions.roles.first();
        if (!role) return message.channel.send("Please mention a role");
        await user.roles.remove(role), message.channel.send(`${user}, ${role} role has been taken away from you`)   
}
}
