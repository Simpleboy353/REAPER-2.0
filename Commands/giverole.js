const Discord = require("discord.js");

module.exports = {
    name: "giverole",
    description: "Give roles to users",
    run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have enough permissions");
        const user = message.mentions.members.first();
        if (!user) return message.channel.send("Please mention a user you want to give the role to");
        const role = message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "));
        if (!role) return message.channel.send("Please mention a role");
        await user.roles.add(role.id), message.channel.send(`${user} now has the ${role} role`)   
}
}