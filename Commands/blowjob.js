const { MessageEmbed } = module.require('discord.js');
const fetch = require('node-fetch');

module.exports = {
            name: 'blowjob',
            description: 'Some Blowjob Pics for you!',
            run: async(client, message, args) => {
        try {
            const res = await fetch(`https://nekos.life/api/v2/blowjob`);
            const img = (await res.json()).message;
            message.channel.send({files: [{attachment: img, name: "trumptweet.png"}]});
        } catch (err) {
            console.log(err);
            message.channel.send(err);
        }
    }
};
