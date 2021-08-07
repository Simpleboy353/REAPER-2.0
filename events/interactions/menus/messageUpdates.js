const { IntegrationApplication } = require("discord.js");
const messageData = require("../../../database/guildData/messagelogs")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.values[0] === "message_logs") {

        await interaction.deferUpdate()
        
        const data = await messageData.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {
            await interaction.channel.send("Please send the **CHANNEL ID** to be setup for Message Update Logs")

            const filter = (m) => m.author.id === interaction.member.id

            let channelID;

            const collector = await interaction.channel.createMessageCollector({ filter, time: 60000 })

            collector.on('collect', async(collected, returnValue) => {
                channelID = collected.content

                let channel = interaction.guild.channels.cache.get(channelID)

                if (!channel) return interaction.channel.send("Couldn't find that channel!")

                let newData = new messageData({
                    ChannelID: channelID,
                    GuildID: interaction.guild.id
                })
    
                newData.save()

                await collector.stop()
    
                return interaction.channel.send(`Message updates will be logged in ${interaction.guild.channels.cache.get(channelID)}`)
            })

            collector.on('end', async(collected, returnValue) => {
                console.log("Collector Stopped!")
            })

        } else if (data) {
            await messageData.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return interaction.channel.send(`Message Updates Logging has been stopped!`)
        }
    }
}