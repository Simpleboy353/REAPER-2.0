const Discord = module.require("discord.js");

module.exports = {
  name: "helpimage",
  description: "Get Image Commands",
  run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Image Commands")
      .setDescription("`achievement`, `amazeme`, `amiajoke`, `bad`, `catsay`, `challenge`, `changemymind`, `creatememe`, `didyoumean`, `drake`, `facts`, `illegal`, `jokeoverhead`, `meme`, `pornhub`, `rip`, `scroll`, `tableflip`, `textimage`, `trash`, `trigger`, `trumptweet`, `wasted`, `wideavatar`");

      message.channel.send(embed)
  }
}