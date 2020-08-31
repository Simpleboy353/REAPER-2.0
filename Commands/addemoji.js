const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
    name: "addemoji",
    category: "Administrators",
    run: async (client, message, args) => {

        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.channel.send(`You Don't Have Permission To Use This Command! Manage Emojis`)
        }

        const emoji = args[0];
        if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
                }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis.create(
                `${Link}`,
                `${name || `${customemoji.name}`}`
            );
            return message.channel.send(`Added ${customemoji} with ${customemoji.name} name!`);
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0])
                return message.channel.send(`Please Give Me A Valid Emoji!`);
            message.channel.send(
                `You Can Use Normal Emoji Without Adding In Server!`
            );
        }
    }
};
