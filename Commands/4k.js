const discord = module.require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: "4k",
    description: "NSFW Command",
    run: async(client, message, args) => {
    if (message.channel.nsfw === true) {
        superagent.get('https://nekobot.xyz/api/image')
            .query({ type: '4k' })
            .end((err, response) => {
                message.channel.send({ file: [{ attachment: `https://nekobot.xyz/api/image/4k`, name: "4k.png" }]});
            });
    } else {
        message.channel.send("This isn't NSFW channel!")
    }
}
};