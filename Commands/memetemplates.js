const Discord = module.require("discord.js");

module.exports = {
    name: "memetemplates",
    description: "Get all the available meme templates",
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Available Meme Templates")
        .setDescription("Usage Example: `=creatememe facepalm Hello Bye`\n`sohappy`,`tenguy`,`afraid`,`apcr`,`older`,`aag`,`atis`,`alyt`,`biw`,`stew`,`blb`,`bihw`,`kermit`,`bd`,`ch`,`cbg`,`wonka`,`cb`,`gandalf`,`keanu`,`cryingfloor`,`dsm`,`disastergirl`,`live`,`ants`,`doge`,`trump`,`drake`,`ermg`,`facepalm`,`feelsgood`,`firsttry`,`fwp`,`fa`,`fbf`,`fmr`,`fry`,`ggg`,`grumpycat`,`harold`,`hipster`,`icanhas`,`crazypills`")
        .setTimestamp()
        .setColor("RANDOM");
    return message.channel.send(embed);
    }
}