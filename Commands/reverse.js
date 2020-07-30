const Discord = module.require("dicord.js");

module.exports = {
    name: "reverse",
    description: "Reverse  the text entered",
    run: async(client, message, args) => {
        try {
            if (!args[0]) return this.client.embed("commonError", message, "Please provide some text for me search from reverse.");
            const str = args.join(' ');
            let msg = await message.channel.send(str.split('').reverse().join(''));
            msg.react('🔁');
        } catch(err) {
            this.client.logger.error(err.stack);
            return this.client.embed("", message);
        }
    }
}