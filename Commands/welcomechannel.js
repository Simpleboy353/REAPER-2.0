const Discord = module.require("discord.js");
const fs = module.require("fs");

module.exports = {
    name: "welcomechannel",
    description: "Setup Welcome Channel for your Server",
    run: async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(`Misisng Permissions: \`ADMINISTRATOR\``)
    }
    const channel = message.mentions.channels.first();
    if (!channel) {
        return message.channel.send("Missing Arguments: `No Channel Mentioned`")
    }
        let wcs = JSON.parse(fs.readFileSync("./wc.json", "utf8")); //Read File
        wcs[message.guild.id] = { //Let The config be
            wc: channel //Let prefix = arguement 1
        }
        fs.writeFile("./wc.json", JSON.stringify(wcs), (err) => { //Write File
            if (err) console.log(err); //If error log error to the console
        })
    const Discord = new Discord.MessageEmbed()
    .setTitle("Success")
    .setDescription(`Welcome channel was set to ${channel}`)
    }
}