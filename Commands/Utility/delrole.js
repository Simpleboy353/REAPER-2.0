const Discord = module.require("discord.js");

module.exports = {
  name: "delrole",
  description: "Deletes a role",
  userPerms: ["ManageRoles"],
  botPerms: ["EmbedLinks", "ManageRoles"],
  run: async (client, message, args) => {
    const role = message.mentions.roles.first();
   
    if (!role) {
      return message.channel.send("`Usage: =delrole <role>`");
    }
    role.delete();
    const embed = new Discord.EmbedBuilder()
      .setTitle("Roles Update")
      .setDescription(`${role} role has been deleted`)
      .setColor("Random");
    await message.channel.send({ embeds: [embed] });
  },
};
