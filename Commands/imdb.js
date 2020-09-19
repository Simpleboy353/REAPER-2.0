const Discord = module.require("discord.js");
const chalk = require('chalk');
const { Command } = require('sylphy');
const imdb = require('imdb-api');

module.exports = {
    name: "imdb",
    description: "Get the IMDB Stats for the provided movie",
    run: async (client, message, args) => {
    var state = "disabled";
    if (state === "disabled") {
        return message.channel.send("The Command has been disabled! Contact Bot Owner for more Info!")
    }
    if (!args.join(` `)) return message.channel.send('Oh no, you didn\'t give a movie or serie to search for.');
    let movie;
    try {
        movie = await imdb.get(args.join(` `), { apiKey: "6fb3a82" });
    } catch (e) {
        return console.log(e)
    }

    let imdbemb = new Discord.RichEmbed()
        .setColor("#00ff00")
        .setTitle(movie.title)
        .setURL(movie.imdburl)
        .setDescription(movie.plot)
        .setThumbnail(movie.poster)
        .addField("Rate", movie.rating, true)
        .addField("Time", movie.runtime, true)
        .addField("Awards", movie.awards, true)
        .addField("Langueages", movie.languages, true)
        .addField("Genres", movie.genres, true)
        .addField("PG", movie.rated, true)
        .addField("Coutry", movie.country, true)
        .addField("Released", movie.released)
        .setFooter('All information is provided by IMDB')

    message.channel.send(imdbemb)

    console.log(movie)

}
}