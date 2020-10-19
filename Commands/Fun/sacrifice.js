const Discord = module.require("discord.js");

var sacrify = [
    "Cthulu",
    "The Flying Spaghetti Monster",
    "the Illuminati",
    "Ben Brode",
    "a local school district",
    "a giant squid",
    "Herobrine",
    "the devil",
    "RNGesusJoe",
    "Bob",
    "get the iPhone X",
    "Santa Claus",
    "God-Emperor Trump",
    "cure cancer",
    "create a new meme",
    "Nyarlathotep",
    "Yogg-Saron",
    "N'Zoth; Y'Shaarj",
    "C'Thun",
    "McDonalds",
    "Dictator Advaith",
    "Slenderman",
    "your mom"
];


module.exports = {
    name: "sacrifice",
    description: "Sacrifice someone",
    usage: "sacrifice <thing/person>",
    category: "fun",
    run: async (client, message, args) => {
        
        const target = message.mentions.members.first();
        
         if (!target) {
            return message.channel.send("Please mention the user whom you want to sacrifice")
        }
        if (target) {
            return message.channel.send(`${message.author.username} sacrificed **${target.displayName}** to **` + (sacrify[Math.floor(Math.random() * sacrify.length)]) + "**")
            }
      }
}
