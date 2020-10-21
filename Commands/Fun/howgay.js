const Discord = module.require("discord.js");

module.exports = {
    name: "howgay",
    description: "Just for fun command",
    run: async(client, message, args) => {
        let target = message.mentions.members.first();
        if (!target) {
        return message.channel.send("You need to mention someone")
        }
        var hga = [
            `${target} is not a gay!`,
            `${target} is 10% gay!`,
            `${target} is 13% gay!`,
            `${target} is 17% gay!`,
            `${target} is 23% gay!`,
            `${target} is 26% gay!`,
            `${target} is 31% gay!`,
            `${target} is 37% gay!`,
            `${target} is 39% gay!`,
            `${target} is 43% gay!`,
            `${target} is 48% gay!`,
            `${target} is 51% gay!`,
            `${target} is 54% gay!`,
            `${target} is 57% gay!`,
            `${target} is 60% gay!`,
            `${target} is 65% gay!`,
            `${target} is 69% gay!`,
            `${target} is 72% gay!`,
            `${target} is 75% gay!`,
            `${target} is 79% gay`,
            `${target} is 83% gay!`,
            `${target} is 85% gay!`,
            `${target} is 89% gay!`,
            `${target} is 91% gay!`,
            `${target} is 94% gay!`,
            `${target} is 96% gay!`,
            `${target} is 99% gay!`,
            `${target} is 100% gay!`,  
        ];
       await message.channel.send(hga[Math.floor(Math.random()*hga.length)])
    },
}