const { MessageEmbed } = require("discord.js")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;

    let msg = await interaction.channel.messages.fetch(interaction.message.id)

    if (interaction.values[0] === "variables") {
        await interaction.deferUpdate()

        return msg.edit((`\`\`\`js
        {user.mention} - Mentions the User who left/joined the server.
        {user.name} - The Username of the User who left/joined the server.
        {server} - The Name of the Server.
        {membercount} - The member count of the server.
        \`\`\`
        `))
    }
}