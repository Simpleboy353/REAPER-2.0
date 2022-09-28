const Discord = module.require("discord.js");
const mathjs = module.require("mathjs");
const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "math",
    aliases: ['calc', 'calculator'],
    description: "Evaluates a mathematical expression.",
    run: async (client, message, args) => {
        if (args.length == 0) {
            message.channel.send("Usage: =math <expression>");
        }
        else {  
            try {
                let input = args.join(" ");
                var result = mathjs.evaluate(input);
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Calculator')
                    .addFields(
                        { name: 'Input Expression:', value: `${input}` },
                        { name: 'Result:', value: `${result}`}
                    )
                    .setTimestamp()
                message.channel.send({ embeds: [embed] });
            } catch (error) {
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Calculator')
                    .addFields(
                        { name: 'Error:', value: "Input expression could not be evaulated." }
                    )
                    .setTimestamp()
                message.channel.send({ embeds: [embed] });
            }
        }
    },
};
