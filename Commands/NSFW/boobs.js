const { MessageEmbed } = module.require('discord.js');
const fetch = require('node-fetch');

module.exports = {
            name: 'boobs',
            description: 'Some Boob Pics for you!',
            run: async(client, message, args) => {
            if (!message.channel.nsfw) {
            return message.channe.send("This command can only be excuted in an NSFW Channel!")
            }
        try {
            const res = await fetch(`https://nekobot.xyz/api/image?type=boobs`);
            const img = (await res.json()).message;
            message.channel.send({files: [{attachment: img, name: "trumptweet.png"}]});
        } catch (err) {
            console.log(err);
            message.channel.send(err);
        }
    }
};
