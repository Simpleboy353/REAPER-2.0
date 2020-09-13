const Discord = module.require("discord.js");
const bot = new Discord.Client();
const snek = require('snekfetch');
const fs = require('fs');
module.exports = {
    name: "jail",
    description: "Another Image Manipulation Command",
    run: async (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('Sorry, i dont have the perms to do this cmd i need ATTACH_FILES. :x:')
    const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("You didn't mention a user to put them behind bars");
    const getSlapped = async (person) => {
        const plate = fs.readFile('./assets/plate_jail.png')
        const png = person.replace('.gif', '.png');
        const { body } = await snek.get(png);
        return new Canvas(250, 250)
            .resetTransformation()
            .addImage(body, 0, 0, 250, 250)
            .addImage(plate, 0, 0, 250, 250)
            .toBuffer();
    }
    try {
        const person = message.mentions.users.first().avatarURL;
        const result = await getSlapped(person);
        await message.channel.send({ files: [{ attachment: result, name: 'jailed.png' }] });
    } catch (error) {
        throw error;
    }
}
}