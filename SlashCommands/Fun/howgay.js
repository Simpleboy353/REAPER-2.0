const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "howgay",
  description: "Tell you how gay someone are [J4F]",
  options: [
        {
            name: "user",
            description: "the user",
            required: true,
            type: ApplicationCommandOptionType.User,
        }
    ],
  run: async (client, interaction, args) => {
   let target = interaction.option.getUser("user");

    let rng = Math.floor(Math.random() * 101);

    const howgayembed = new EmbedBuilder()
      .setTitle(`Gay Machine Calculator`)
      .setDescription(`${target.username} is ` + rng + "% Gay🌈")
      .setColor("Green");a

    await interaction.reply({ embeds: [howgayembed] });
  }
}
