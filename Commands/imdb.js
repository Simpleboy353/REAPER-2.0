const Dicord = module.require("discod.js");
const imdb = require("imdb-api");

module.exports = {
    name: "imdb",
    description: "Get the information about series and movies",
    run: async(client, message, args) => {
        if (!args) {
            return message.channel.send("Please Give the name of a movie or series!")
        }

        const imdb = new imdb.Client({apiKey: "5e36f0db"})

        let movie = await imdb.get({'name': args.join(" ")})

        const embed = new Discord.MessageEmbed()
        .setTitle(movie.Title)
        .setColor("RANDOM")
        .setThumbnail(movie.poster)
        .SetDescription(
        `Description: \`${movie.plot}\`
         Ratings: \`${movie.ratings}\`
         Country: \`${movie.country}\`
         Languages: \`${movie.languages}\`
         Type: \`${movie.type}\``
            );

            message.chanel.send(embed);
    }
}