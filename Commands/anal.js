const discord = module.require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: "anal",
    description: "Anal Pics for you!",
    run: async (client, msg, args) => {
    if (msg.channel.nsfw === true) {
        superagent.get('https://nekobot.xyz/api/image')
            .query({ type: 'anal' })
            .end((err, response) => {
                msg.channel.send({ file: [{attachment: response.body.message }]});
            });
    } else {
        msg.channel.send("This isn't NSFW channel!")
    }
}
};
