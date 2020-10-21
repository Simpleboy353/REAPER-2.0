const { MessageEmbed } = module.require('discord.js');
const fetch = require('node-fetch');

module.exports = {
            name: 'boobs',
            description: 'Some Boob Pics for you!',
            run: async(client, message, args) => {
        try{
            var errMessage = "This is not an NSFW Channel";
            if (!message.channel.nsfw) {
                message.react('💢');

                return message.reply(errMessage)
                    .then(msg => {
                        msg.delete({ timeout: 3000 })
                    })
                }
            const res = await fetch(`https://nekobot.xyz/api/image?type=boobs`);
            const img = (await res.json()).message;
            message.channel.send({files: [{attachment: img, name: "trumptweet.png"}]});
        } catch (err) {
            console.log(err);
            message.channel.send(err);
        }
    }
};