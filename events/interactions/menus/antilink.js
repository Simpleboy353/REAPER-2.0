const antilinkData = require("../../../database/guildData/antilink")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;
    let msg = await interaction.channel.messages.fetch(interaction.message.id)
    if (interaction.values[0] === "antilink") {

        await interaction.deferUpdate()

        const data = await antilinkData.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {
            let newData = new antilinkData({
                GuildID: interaction.guild.id
            })

            newData.save();

            return msg.edit('Antilink System has been enabled!')
        } else if (data) {
            
            await antilinkData.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return msg.edit('Antilink System has been disabled!')
        }
    }
}