const Discord = module.require("discord.js");

module.exports = {
  name: "pokeimg",
  description: "Get Image of the Mentioned Pokemon",
  botPerms: ["EmbedLinks"],
  run: async (client, message, args) => {
    const state = "enabled";
    if (state === "disabled") {
      return message.channel.send("The command has been disabled for now!");
    }
    const name = args.join(" ");
    if (!name) {
      return message.channel.send("Please type the Pokemon Name");
    }
    const link = `https://i.some-random-api.ml/pokemon/${name}.png`;
    const embed = new Discord.EmbedBuilder()
      .setTitle(`${name}`)
      .setImage(link)
      .setColor("Random");

    message.channel.send({embeds: [embed]});
  },
};
