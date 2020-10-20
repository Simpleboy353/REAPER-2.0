const Discord = module.require("discord.js");

module.exports = {
  name: "helpconfig",
  description: "Get Config Commands",
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle("Config Commands")
      .setDescription("`prefix`")
      .setFooter("New Commands Coming Soon!")
      .setColor("RANDOM");

    message.channel.send(embed);
  }
}