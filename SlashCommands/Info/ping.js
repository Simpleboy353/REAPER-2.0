const discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Get the bot's ping!",
  options: [
    {
      name: "info",
      description: "Get the bot's ping!",
      type: 'SUB_COMMAND'
    }
  ],
  run: async (client, interaction, args) => {

    if (interaction.options.getSubcommand() === "info") {
    let start = Date.now();

    let embed1 = new discord.MessageEmbed()
    .setDescription("Looks like the bot is slow.")
    .setColor("RANDOM")

    const msg = await interaction.reply({
        embeds: [embed1]
      })
        let end = Date.now();

        let embed = new discord.MessageEmbed()
          .setTitle("Ping!")
          .addField("API Latency", `${Math.round(client.ws.ping)}ms`, true)
          .addField("Message Latency", `${end - start}ms`, true)
          .setColor("RANDOM");

       await msg.edit({ embeds: [embed] }).catch((e) => interaction.reply(e));
    }
  },
};