const { IntegrationApplication } = require("discord.js");
const leaveData = require("../../../database/guildData/leavechannel")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;
    let msg = await interaction.channel.messages.fetch(interaction.message.id)

    if (interaction.values[0] === "leave_channel") {

        await interaction.deferUpdate()
        
        const data = await leaveData.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {
            msg.edit("Please send the **CHANNEL ID** to be setup as Goodbye channel")

            const filter = (m) => m.author.id === interaction.member.id

            let channelID;

            const collector = await interaction.channel.createMessageCollector({ filter, time: 60_000 })

            collector.on('collect', async(collected, returnValue) => {
                channelID = collected.content

                let channel = interaction.guild.channels.cache.get(channelID)

                if (!channel) return msg.edit("Couldn't find that channel!")

                let newData = new leaveData({
                    Bye: channelID,
                    GuildID: interaction.guild.id
                })
    
                newData.save()

                await collector.stop()
    
                return msg.edit(`Leave channel is set to ${interaction.guild.channels.cache.get(channelID)}`)
            })

            collector.on('end', async(collected, returnValue) => {
                console.log("Collector Stopped!")
            })
    
        } else if (data) {
            await leaveData.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return msg.edit(`Leave channel has been removed!`)
        }
    }
}