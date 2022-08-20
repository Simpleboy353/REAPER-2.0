const discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "Utility",
    usage: "ping",
    description: "Get the bot's ping!",
    ownerOnly: false,
    nsfwOnly: false,
    run: async (client, message, args) => {

     let start = Date.now();

     let pingEmbed = new discord.EmbedBuilder()
     .setDescription("Looks like the bot is slow.")
     .setColor("Random")
  
  message.channel.send({ embeds: [pingEmbed] }).then(m => {
    
    let end = Date.now();
    
    let embed = new discord.EmbedBuilder()
    .setTitle("Ping!")
    .addFields([
      { name: "API Latency", value: Math.round(client.ws.ping) + "ms" },
      { name: "Message Latency", value: end - start + "ms" }
    ])
    .setColor("Random");
    m.edit({ embeds: [embed] }).catch(e => message.channel.send(e))
    
  })

    }
};
