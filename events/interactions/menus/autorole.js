const autoroleData = require("../../../database/guildData/autorole")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;
    let msg = await interaction.channel.messages.fetch(interaction.message.id)
    if (interaction.values[0] === "autorole") {

        const data = await autoroleData.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {

            msg.edit('Send the **ROLE ID** for autorole!')

            const filter = (m) => m.author.id == interaction.message.author.id

            var RoleMsg = await interaction.channel.awaitMessages({ time: 60000, max: 1, errors: ['time'] })
            
            let role = RoleMsg.first().content

                let newData = new autoroleData({
                    Role: role,
                    GuildID: interaction.guild.id
                })
    
                newData.save();
            return msg.edit(`Autorole set to ${interaction.guild.roles.cache.get(role)}`)

        } else if (data) {
            
            await autoroleData.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return msg.edit(`Autorole has been disabled!`)
        }
    }
}