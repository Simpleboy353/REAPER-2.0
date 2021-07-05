const Discord = module.require("discord.js");

module.exports = {
  name: "delrole",
  description: "Deletes a role",
  userPerms: ["MANAGE_ROLES"],
  botPerms: ["EMBED_LINKS", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    const role = message.mentions.roles.first();
   
    if (!role) {
      return message.channel.send("`Usage: =delrole <role>`");
    }
    role.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle("Roles Update")
      .setDescription(`${role} role has been deleted`)
      .setColor("RANDOM");
    await message.channel.send({ embeds: [embed] });
  },
};
