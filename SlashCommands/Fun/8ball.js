const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "8ball",
  description: "Tells you a fortune",
  options: [
      {
          name: "question",
          description: "The question you want to ask the magic 8ball",
          required: true,
          type: ApplicationCommandOptionType.String,
      }
  ],
  run: async (client, interaction, args) => {
    
    var fortunes = [
      "Yes.",
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes definelty.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now...",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good...",
      "Very doubtful.",
    ];
    await interaction.reply(
      fortunes[Math.floor(Math.random() * fortunes.length)]
    );
  },
};
