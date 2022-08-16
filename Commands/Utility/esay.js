const Discord = module.require("discord.js");

module.exports = {
  name: "esay",
  description: "Send Messages in embed form",
  botPerms: ["EmbedLinks", "ManageMessages"],
  run: async (client, message, args) => {
    let msg = args.join(" ");
    if (!msg) {
      return message.channel.send("Enter some text");
    }
    const embed = new Discord.EmbedBuilder()
      .setDescription(`${msg}`)
      .setColor("Random");

    message.channel.send({ embeds: [embed] });
    message.delete();
  },
};
