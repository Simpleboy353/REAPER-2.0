const automodData = require("../../../database/guildData/antiwords")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;
    if (interaction.values[0] === "automod") {

        await interaction.deferUpdate()

        const data = await automodData.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {
            let newData = new automodData({
                GuildID: interaction.guild.id
            })

            newData.save();

            return interaction.channel.send('Automod has been enabled')
        } else if (data) {
            
            await automodData.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return interaction.channel.send('Automod has been disabled!')
        }
    }
}