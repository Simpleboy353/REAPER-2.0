const Discord = module.require("discord.js");

module.exports = {
  name: "howgay",
  description: "Just for fun command",
  options: [
      {
          name: "user",
          description: "who you want to be checked",
          type: 'MENTIONABLE',
      }
     ],
      run: async (client, interaction, args) => {
    let target = await interaction.options.getMentionable("user")

  let rng = Math.floor(Math.random() * 101);

  const howgayembed = new Discord.MessageEmbed()
    .setTitle(`Gay Machine Calculator`)
    .setDescription(`${target.username} is ` + rng + "% Gay🌈")
    .setColor("RANDOM");

  message.channel.send({ embeds: [howgayembed] });
},
}
