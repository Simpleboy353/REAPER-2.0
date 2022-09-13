const Discord = module.require("discord.js");

module.exports = {
  name: "wiki",
  description: "Get Search Results from Wikipedia",
  botPerms: ["EmbedLinks"],
    run: async (client, message, args) => {
        const search = args.join("_");
        const msg = args.join(" ");
        if (!msg) {
            return message.channel.send("You need to enter some text to search for");
        }
        const link = `https://www.wikipedia.org/w/index.php?search=${search}&ns0=1`;
        const embed = new Discord.EmbedBuilder()
            .setTitle(`Wikipedia Search`)
            .addFields(
                { name: `You Searched for:`, value: `${msg}`},
                { name: `Results:`, value: `[Here's What I found](${link})` },
            )
            .setColor("Random");

    message.channel.send({ embeds: [embed] });
  },
};
