const discord = require('discord.js');
const superagent = require('superagent')

exports.run = (client, msg, args) => {
    if (msg.channel.nsfw === true) {
        superagent.get('https://nekobot.xyz/api/image')
            .query({ type: '4k' })
            .end((err, response) => {
                msg.channel.send({ file: [{ attachment: response.body.message}]});
            });
    } else {
        msg.channel.send("This isn't NSFW channel!")
    }
};