const Discord = module.require("discord.js");
module.exports = {
  name: "clyde",
  description: "Get a custom clyde message!",
  botperms: ["ATTTACH_FILES"],
  
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send("`Usage: =clyde <msg>`");
    }
    let clydeMessage = args.slice(0).join(" ");
    let image = `https://ctk-api.herokuapp.com/clyde/${clydeMessage}
    
    let embed = new Discord.MessageEmbed()
   .setImage(image)

    message.channel.send({
embeds: [embed]
     });
  },
};
