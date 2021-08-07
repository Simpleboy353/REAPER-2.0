const { MessageEmbed } = require("discord.js")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.values[0] === "variables") {
        await interaction.deferUpdate()

        let embed = new MessageEmbed()
        .setTitle('Variables for Custom Messages')
        .setDescription(`\`\`\`js
{user.mention} - Mentions the User who left/joined the server.
{user.name} - The Username of the User who left/joined the server.
{server} - The Name of the Server.
{membercount} - The member count of the server.
\`\`\`
`)
        .setColor("GREEN")
        .setFooter('These work only for welcomer system!')

        return interaction.channel.send({ embeds: [embed] })
    }
}