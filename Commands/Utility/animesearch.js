const Discord = require("discord.js");
const malScraper = require('mal-scraper');

module.exports = {
  name: "animesearch",
  category: "utility",
description: "Get info about an anime",
usage: "[command | Anime]",
run: async (client, message, args) => {
        const search = `${args}`;
        if(!search)
        return message.reply('Please add a search query if invalid command will not work.');

        malScraper.getInfoFromName(search)
          .then((data) => {
          const malEmbed = new Discord.EmbedBuilder()
            .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
            .setThumbnail(data.picture)
            .setColor('#ffc1cc') //I personally use bubblegum pink!
            .addFields([
              { name: 'English Title', value: data.englishTitle },
              { name: 'Japanese Title', value: data.japaneseTitle },
              { name:'Type', value: data.type },
              { name: 'Episodes', value: data.episodes },
              { name: 'Rating', value: data.rating },
              { name: 'Aired', value: data.aired },
              { name: 'Score', value: data.score },
              { name: 'Score Stats', value: data.scoreStats },
              { name: 'Link', value: data.url }
            ]);

            message.channel.send({ embeds: [malEmbed] });

          })
}
};
