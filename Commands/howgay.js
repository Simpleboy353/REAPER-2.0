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
            `${target} is not a gay!`
            `${target} is 10% gay. You're safe!`,
            `${target} is 13% gay. You're safe!`,
            `${target} is 17% gay. You're safe!`,
            `${target} is 23% gay. You're safe!`,
            `${target} is 26% gay. You are safe for now, but be aware!`,
            `${target} is 31% gay. You are safe for now, but be aware!`,
            `${target} is 37% gay. You are safe for now, but be aware!`,
            `${target} is 39% gay. You are safe for now, but be aware!`,
            `${target} is 43% gay. You are safe for now, but be aware!`,
            `${target} is 48% gay. You are safe for now, but be aware!`,
            `${target} is 51% gay. Everyone beware of this guy`,
            `${target} is 54% gay. Everyone beware of this guy`,
            `${target} is 57% gay. Everyone beware of this guy`,
            `${target} is 60% gay. Everyone beware of this guy`,
            `${target} is 65% gay. Everyone beware of this guy`,
            `${target} is 69% gay. Everyone beware of this guy`,
            `${target} is 72% gay. Everyone beware of this guy`,
            `${target} is 75% gay. Everyone beware of this guy`,
            `${target} is 79% gay. Everyone beware of this guy`,
            `${target} is 83% gay. Stay away from us you gay!`,
            `${target} is 85% gay. Stay away from us you gay!`,
            `${target} is 89% gay. Stay away from us you gay!`,
            `${target} is 91% gay. Stay away from us you gay!`,
            `${target} is 94% gay. Stay away from us you gay!`,
            `${target} is 96% gay. Stay away from us you gay!`,
            `${target} is 99% gay. Stay away from us you gay!`,
            `${target} is 100% gay. Stay away from us you gay!`,  
        ];
        message.channel.send(hga[Math.floor(Math.random()*hga.length)])
    }
}