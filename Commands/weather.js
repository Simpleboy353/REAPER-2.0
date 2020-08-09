const Discord = module.require("discord.js");

module.exports = {
   name: "weather",
   description: "Shows Weather for the provided place",
   run: async(client, message, args) => {
   const place = args.join(" ");
   if (!place) {
   return message.channel.send("Please enter the name of a Country/City/Town")
   }
   const link = `https://wttr.in/${place}.png?m`;
   
  const embed = new Discord.MessageEmbed()
  .setTitle(`Weather of ${place} today`)
  .setImage(link)
  .setColor("RANDOM");

  message.channel.send(embed);
}
}
