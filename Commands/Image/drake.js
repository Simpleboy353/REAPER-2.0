const Discord = require("discord.js");

module.exports = {
    name: "drake",
    permissions: ["SEND_MESSAGES"],
    cooldown: 3,
    description: "Image Manipulation Command",
    async execute(client, message, cmd, args, Discord) {
        message.channel.send("⚠ **| This Command `drake` Is Splited Cuz Of Two Texts**").then((msg) => {
            setTimeout(function () {
                msg.edit("⚠ **| Example: i dont care about you | <--Splits Here And Continues Here--> dont care about you**")
                setTimeout(function () {
                    msg.edit("⚠ **| Max Is 1 Chracters For The First Split | Then Continue On Second Character**")
                }, 15000)
            }, 15000)
        })
        const text = args.slice(1).join(" ");
        if (!text) {
            return message.channel.send("**Enter Some Text!**")
        }

        const text2 = args.slice(2).join(" ");
        if (!text2) {
            return message.channel.send("**Enter The Second Text!**")
        }

        message.channel.send({ files: [{ attachment: `https://api.popcatdev.repl.co/drake?text1=${text}&text2=${text2}`, name: "reaperdrake.png" }] });
    }
}
