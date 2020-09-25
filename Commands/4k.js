const { MessageEmbed } = module.require('discord.js');
const fetch = require('node-fetch');

module.exports = {
            name: '4k',
            description: 'Some 4k Pics for you!',
            run: async(client, message, args) => {
        try {
            const res = await fetch(`https://nekobot.xyz/api/image?type=4k`);
            const img = (await res.json()).message;
            message.channel.send({files: [{attachment: img, name: "trumptweet.png"}]});
        } catch (err) {
            console.log(err);
            message.channel.send(err);
        }
    }
};
