const Discord = module.require("discord.js");

module.exports = {
   name: "weather",
   description: "Shows Weather for the provided place",
   run: async(client, message, args) => {
   const place = args.join(" ");
   if (!place) {
   return message.channel.send("Please enter the name of a Country/City/Town")
   }
   const embed = new Discord.MessageEmbed()
   .setTitle(`${place}'s Weather Today`)
   .setImage(`https://wttr.in/${place}.png`)
   .setColor("RANDOM")
   .setFooter("Credits to Wttr.in");
  message.channel.send(embed);
}
}
