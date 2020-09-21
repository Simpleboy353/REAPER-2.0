const { MessageEmbed } = module.require('discord.js');
const fetch = require('node-fetch');

module.exports = {
            name: 'anal',
            description: 'Some anal Pics for you!',
            run: async(client, message, args) => {
        try {
            const res = await fetch(`https://nekobot.xyz/api/imagegen?type=anal`);
            const img = (await res.json()).message;
            message.channel.send({files: [{attachment: img, name: "trumptweet.png"}]});
        } catch (err) {
            console.log(err);
            message.channel.send(err);
        }
    }
};
