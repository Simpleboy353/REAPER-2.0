const Discord = module.require("discord.js");

module.exports = {
    name: "massaddrole",
    description: "Add rle to all the users in the server!",
    run: async(client, message, args) => {
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("I don't have enough Permissions!");
        }
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("You don't have enough Permissions!");
        }

        const role = message.mentions.roles.first();
        if (!role) {
            return message.channel.send("You need to mention a role!");
        }

        if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
            return message.channel.send(`My role is not higher than the ${role} role!`)
        }
        if (message.member.roles.highest.comparePositionTo(role) < 0) {
            return message.channel.send(`You role is higher than ${role} role!`)
        }

        message.guild.members.cache.forEach(member => member.roles.add(role));

        message.channel.send(`Succesfully gave the role to ${message.guild.members.cache.size} users!`)
    }
}