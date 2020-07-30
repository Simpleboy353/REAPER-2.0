const Discord = module.require("discord.js");
const superagent = require("snekfetch");
module.exports = {
    name: "anal",
    description: "NFSW Commands",
    run: async(client, message, args) => {
        if (!message.channel.nsfw) {
        return message.channel.send('You can use this command in an NSFW Channel!')
        }
        var img = superagent.get('https://nekos.life/api/v2/img/anal')

          const lewdembed = new Discord.MessageEmbed()
          .setTitle("Hentai")
          .setImage(img.body.url)
          .setColor(`#000000`)
          .setFooter(`Tags: anal`)
          .setURL(response.body.url);
        message.channel.send(lewdembed);
    }
}