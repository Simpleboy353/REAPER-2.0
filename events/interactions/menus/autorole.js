const autoroleData = require("../../../database/guildData/autorole")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;
    if (interaction.values[0] === "autorole") {

        await interaction.deferUpdate()

        const data = await autoroleData.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {

            interaction.channel.send('Send the **ROLE ID** for autorole!')

            const filter = (m) => m.author.id == interaction.message.author.id

            var RoleMsg = await interaction.channel.awaitMessages({ time: 60000, max: 1, errors: ['time'] })
            
            let role = RoleMsg.first().content

                let newData = new autoroleData({
                    Role: role,
                    GuildID: interaction.guild.id
                })
    
                newData.save();
            return interaction.channel.send(`Autorole set to ${interaction.guild.roles.cache.get(role)}`)

        } else if (data) {
            
            await autoroleData.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return interaction.channel.send(`Autorole has been disabled!`)
        }
    }
}