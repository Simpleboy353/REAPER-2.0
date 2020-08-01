const Discord = module.require("discord.js");

module.exports = {
    name: "penis",
    description: "Another fun Command",
    run: async(client, message, args) => {
        let target = message.mentions.members.first();
        if (!target) {
        return message.channel.send("You need to mention someone")
        }
        var penis = [
            `404 NOT FOUND. This error ocurred most probably because ${target} don't have a penis.`,
            `${target.username}'s Penis \n8D`,
            `${target.username}'s Penis \n8=D`,
            `${target.username}'s Penis \n8==D`,
            `${target.username}'s Penis \n8===D`,
            `${target.username}'s Penis \n8====D`,
            `${target.username}'s Penis \n8=====D`,
            `${target.username}'s Penis \n8======D`,
            `${target.username}'s Penis \n8=======D`,
            `${target.username}'s Penis \n8========D`,
            `${target.username}'s Penis \n8=========D`,
        ];
        let embed = new Discord.MessageEmbed()
        .setDescription(penis[Math.floor(Math.random()*penis.length)])
        .setColor("RANDOM");
        await message.channel.send(embed)
    },
}