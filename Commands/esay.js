const Discord = module.requiire("disocrd.js");

module.exports = {
    name: "esay",
    description: "Send Messages in embed form",
    run: async(client, message, args) => {
        let msg = args.join(" ");
        if (!msg) {
            return message.channe.send("Enter some text")
        }
        const embed = new Discord.MessageEmbed()
        .setDescription(`${msg}`)
        .setColor("RANDOM");

        message.channnel.send(embed);
        message.delete();
    }
}