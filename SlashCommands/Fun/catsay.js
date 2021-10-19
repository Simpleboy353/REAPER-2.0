const Discord = module.require("discord.js");
module.exports = {
name: "catsay",
    description: "Make The Cat say thing of your choice",
    options: [
        {
            name: "text",
            description: "the text",
            type: "STRING",
            required: true
        }
    ],
  run: async (client, interaction, args) => {
    const state = "enabled";
    if (state === "disabled") {
      return interaction.reply("Command has been disabled for now");
    }
    const msg = args.join(" ");
    if (!msg) {
      return interaction.reply("What you want the cat to say?");
    }
    interaction.reply({
      files: [
        {
          attachment: `https://cataas.com/cat/cute/says/${msg}`,
          name: "catsay.png",
        },
      ],
    });
  },
};
