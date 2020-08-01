const Discord = module.require("discord.js");

module.exports = {
    name: "bubblewrap",
    description: "Send a wrapped message",
    run: async(client, message, args) => {
    if (!args[0]) {
    return message.channel.send("You need to enter at least one word and not more than 20 words")
    }
    await message.channel.send(`||${args[0]}|| ||${args[1]}|| ||${args[2]}|| ||${args[3]}|| ||${args[4]}|| ||${args[5]}|| ||${args[6]}|| ||${args[7]}|| ||${args[8]}|| ||${args[9]}|| ||${args[10]}|| ||${args[11]}|| ||${args[12]}|| ||${args[13]}|| ||${args[14]}|| ||${args[15]}|| ||${args[16]}|| ||${args[17]}|| ||${args[18]}|| ||${args[19]}||`);
    }
}