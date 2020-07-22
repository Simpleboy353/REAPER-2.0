const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  message.author.send("[Click Me To Invite](https://discordapp.com/oauth2/authorize?client_id=462338332911730688&scope=bot&permissions=2146958591)");
}

module.exports.help = {
    name: "botinvite",
    description: "Sends you the bot invite for Linkster",
    usage: "botinvite",
    type: "General"  
}