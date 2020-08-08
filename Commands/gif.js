const Discord = module.require("discord.js");
const { tenorAPI } = "ZEEELJXAFQBN";

module.exports = {
   name: "gif",
   description: "Finds for gifs from Giphy.com",
   run: async(client, message, args) => {
   const name = args.join(" ");
   if (!name) {
   return message.channel.send("Gif about What..??")
   }
   let link = `https://api.tenor.com/v1/random?key=${tenorAPI}&q=${text}&limit=1`;
   
   const embed = new Discord.MessageEmbed()
   .setTitle(`First result for "${name}" on Giphy.com`)
   .setImage(link)
   .setColor("RANDOM");

  message.channel.send(embed);
}
}
