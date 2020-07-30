const Discord = module.require("discord.js");

module.exports = {
    name: "anal",
    description: "NFSW Commands",
    run: async(client, message, args) => {
        if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
        superagent.get('https://nekos.life/api/v2/img/anal')
            .end((err, response) => {
          const lewdembed = new Discord.MessageEmbed()
          .setTitle("Hentai")
          .setImage(response.body.url)
          .setColor(`#000000`)
          .setFooter(`Tags: anal`)
          .setURL(response.body.url);
        message.channel.send(lewdembed);
    })
}
}