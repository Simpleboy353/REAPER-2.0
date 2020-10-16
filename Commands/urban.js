const Discord = module.require('discord.js');
const urban = require("urban");

module.exports = {
    name: "urban",
    description: "Find meanings from the urban dictionary",
    run: async(client, message, args) => {
    if (!message.channel.nsfw) {
      return message.channel.send("This Command can only be used in an NSFW Channel!")
    }
    let str = args.join("");
    if (!str) {
    return message.channel.send("Enter a word")
    }
    if (args.length > 0) {
    urban(str).first(json => {
    if (!json) return message.channel.send("No results found!")
      
    let embed = new Discord.MessageEmbed()
    .setTitle(json.word)
    .setColor("3498db")
    .setDescription(json.definition || "No definition!")
    .addField("Upvotes", json.thumbs_up, true)
    .addField("Downvotes", json.thumbs_down, true)
    .setFooter("Source: Urban Dictionary, Author: " + json.author);
      
    message.channel.send(embed);
    });
  }
}
}