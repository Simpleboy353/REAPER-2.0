const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "slap",
  description: "Slap someone in the server",
  options: [
      {
          name: "who",
          description: "The person you want to slap",
          required: true,
          type: ApplicationCommandOptionType.Mentionable,
      }
  ],
  run: async (client, interaction, args) => {
    let member = interaction.options.getMentionable("who");
    if (!member) {
      return interaction.reply("You need to mention a user");
    }
    const embed = new Discord.EmbedBuilder()
    .setDescription(interaction.author.username + " slapped :raised_back_of_hand: " + member.user.username + ", " + member.user.username + " is now in the hospital! :hospital:")
    .setColor("Random");
    await interaction.reply({ embeds: [embed] });
  },
};
