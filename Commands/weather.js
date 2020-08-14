const Discord = module.require("discord.js");

module.exports = {
   name: "weather",
   description: "Shows Weather for the provided place",
   run: async(client, message, args) => {
   const place = args.join(" ");
   if (!place) {
   return message.channel.send("Please enter the name of a Country/City/Town")
   }  
  message.channel.send({files : [{attachment : `https://wttr.in/${place}.png`, name: 'weather.png' }]});
}
}
