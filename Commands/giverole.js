const Discord = require("discord.js");

module.exports = {
    name: "giverole",
    description: "Give roles to users",
    run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have enough permissions");
        const name = message.mentions.roles.first();
        if (!name) return message.channel.send("Please mention a role");
        const user = message.mentions.members.first();
        if (!user) return message.channel.send("Please mention a user you want to give the role to");
        const role = message.guild.roles.cache.find(r => r.name === name);
        if (!role) return message.channel.send("Couldn't find the Provided Role");
        await user.roles.add(role.id), message.channel.send(`${user} now has the ${role} role`)   
}
}
