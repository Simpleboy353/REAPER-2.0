const Discord = require('discord.js');

require('dotenv');

module.exports = {
    name: "botservers",
    description: "Check what Servers the bot is in!",
    run: async (client, message, args) => {
    try {
        if (message.author.id != "549930183126286359") return message.channel.send(`<a:_cross:725303285015117844> Developer Only <a:_cross:725303285015117844>`);
        let data = [];
        client.guilds.forEach(x => {
            message.channel.send(`🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`);
        });

        if (data.length > 0) {
            data.sort();
            data = `🔹 ` + data.join('\n🔹');
        }
        else {
            data = "[No server found]";
        }
    } catch (err) {

        const errorlogs = client.channels.get('747423875956080801')

        message.channel.send(`Whoops, We got a error right now! This error has been reported to Support center!`)

        errorlogs.send(`Error on bs commands!\n\nError:\n\n ${err}`)

    }
}
};