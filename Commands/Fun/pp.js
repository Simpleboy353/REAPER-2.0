const Discord = module.require("discord.js");

module.exports = {
    name: "pp",
    description: "Another fun Command",
    run: async(client, message, args) => {
        let target = message.mentions.members.first();
        if (!target) {
        return message.channel.send("You need to mention someone")
        }
        var penis = [
            `404 NOT FOUND. This error ocurred most probably because ${target} don't have a pp.`,
            `403 Forbidden. Couldn't find pp of ${target}. Please be sure that ${target} is having a pp!`,
            `${target.displayName}'s pp \n8D`,
            `${target.displayName}'s pp \n8=D`,
            `${target.displayName}'s pp \n8==D`,
            `${target.displayName}'s pp \n8===D`,
            `${target.displayName}'s pp \n8====D`,
            `${target.displayName}'s pp \n8=====D`,
            `${target.displayName}'s pp \n8======D`,
            `${target.displayName}'s pp \n8=======D`,
            `${target.displayName}'s pp \n8========D`,
            `${target.displayName}'s pp \n8=========D`,
        ];
        let embed = new Discord.MessageEmbed()
        .setDescription(penis[Math.floor(Math.random()*penis.length)])
        .setColor("RANDOM");
        await message.channel.send(embed)
    },
}
