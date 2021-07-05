const Discord = module.require("discord.js");

module.exports = {
  name: "newvoice",
  description: "Create Voice Channels in your Server",
  userPerms: ["MANAGE_CHANNELS"],
  botPerms: ["EMBED_LINKS", "MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send("Please mention the name for the Channel");
    }
    message.guild.channels.create(args.slice(0).join(" "), { type: "voice" });

    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`Channel has been created`)
      .setColor("RANDOM");
    message.channel.send({ embeds: [embed] });
  },
};
