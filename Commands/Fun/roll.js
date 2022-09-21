const Discord = module.require("discord.js");

module.exports = {
    name: "roll",
    description: "Rolls an n-sided die.",
    run: async (client, message, args) => {
        if (args.length == 0) { //Roll 6-sided die
            return message.channel.send("Rolled a " + (Math.floor(Math.random() * 6) + 1) + ".");
        }
        else if (args.length == 1) { //Roll n-sided die
            var n = parseInt(args[0]);
            if (isNaN(n) || n < 1) {
                return message.channel.send("Invalid Input!\nUsage: =roll <integer >= 1>");
            }
            console.log(n);
            return message.channel.send("Rolled a " + (Math.floor(Math.random() * n) + 1) + ".");
        }
        else {
            return message.channel.send("Invalid Input!\nUsage: =roll <integer >= 1>");
        }
    },
};
