const  Discord = module.require("discord.js");
const PlayStore = require("google-play-scraper");

module.exports = {
    name: "playstore",
    description: "Get any game's info available on Google Play Store",
    run: async(client, message, args) => {
        const name = args.join(" ");
        if (!name) {
            return message.channel.send("Enter an application's name!")
        }

        PlayStore.search({
            term: args.join(" "),
            num:1
        }).then(Data => {
            let App;

            try{
                App = JSON.parse(JSON.stringify(Data[0]));
            } catch (error) {
                return message.channel.send(
                `Couldn't find application with the name: \`${args.join(" ")}\``
                );
            }

            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setURL(App.url)
            .setTitle(`${App.title}`)
            .setDescription(
            `Description: \`${App.summary}\`
             Price: \`${App.priceText}\`
             Developer: \`${App.developer}\`
             Ratings: \`${App.scoreText}\``
                )
            .setFooter(`Requested by: ${message.author.username}`)
            .setThumbnail();
        
        message.channel.send(embed);
        })
    }
}
