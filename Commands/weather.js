const Discord = module.require("discord.js");

module.exports = {
   name: "weather",
   description: "Shows Weather for the provided place",
   run: async(client, message, args) => {
   const name = args.join(" ");
   const place = args.join("-");
   if (!place) {
   return message.channel.send("Please enter the name of a Country/City/Town")
   }
   const link = `https://wttr.in/${place}.png?m`;
   const weblink = `https://wttr.in/${place}`;
   const embed = new Discord.MessageEmbed()
   .setTitle(`${name}'s Weather for Next 3 days`)
   .setImage(link)
   .setFooter("Credits to Wttr.in")
   .setColor("RANDOM");
message.channel.send(embed);
}
}
