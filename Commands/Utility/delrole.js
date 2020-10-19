const Discord = module.require("discord.js");

module.exports = {
    name: "delrole",
    description: "Deletes a role",
    run: async(client, message, args) => {
    const role = message.mentions.roles.first();
    if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.channel.send("You don't have enough Permissions")
    }
    if (!role) {
    return message.channel.send("`Usage: =delrole <role>`")
    }
    role.delete();
    const embed = new Discord.MessageEmbed()
    .setTitle("Roles Update")
    .setDescription (`${role} role has been deleted`)
    .setColor("RANDOM");
  await message.channel.send(embed);
}
}
