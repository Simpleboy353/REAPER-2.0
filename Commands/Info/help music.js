const Discord = module.require("discord.js");

module.exports = {
  name: "help music",
  description: "Get Music Commands",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Music Commands")
      .setDescription("`play [p]`, `pause`, `resume [r]`, `skip [s]`, `shuffle`, `skipto [st]`, `search`, `stop`, `queue [q]`, `np`, `playlist [pl]`, `volume`, `pruning`, `remove`, `lyrics [ly]`, `loop [l]`")
      .setColor("RANDOM");

    message.channel.send(embed)
  }
}