const Discord = module.require("discord.js");

module.exports = {
    name: "ytcomment",
    description: "Do a fake yt comment",
    run: async (client, message, args) => {
        const text = args.join(" ");
        if (!text) {
            return message.channel.send("Nothing to comment...");
        }
        const username = message.author.username;
        const avatar = user.user.displayAvatarURL({ size: 144, format: "png" });

        await message.channel.send({ files: [{ attachment: `https://some-random-api.ml/canvas/youtube-comment?avatar=${avatar}&comment=${text}&username=${username}`, name: 'file.jpg' }] })
    }
}