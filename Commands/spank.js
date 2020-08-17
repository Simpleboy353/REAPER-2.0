const Discord = module.require("discord.js");
const superagent = require("snekfecth");

module.exorts = {
    name: "spank",
    description: "Another Fun Command",
    run: async(client, message, args) => {
    const user = message.mentions.members.first();
    if (!user) {
    return message.channel.send("PLease mention a user")
    }
    superagent.get(`https://nekos.life/api/v2/img/spank`)
    .end((err, response) => {
    const lewdembed = new Discord.MessageEmbed()
            .setTitle(user.username + " just got spanked by " + message.author.username)
            .setImage(response.body.url)
            .setColor(`RANDOM`)
            .setDescription((user.toString() + " got SPANKED! by " + message.author.toString()))
            .setFooter(`That must hurt ._.`)
            .setURL(response.body.url);
        message.channel.send(lewdembed);
    }) 
    }
}