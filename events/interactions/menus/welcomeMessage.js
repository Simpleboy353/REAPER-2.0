const JoinMsg = require('../../../database/guildData/joinmsg')

module.exports = async(interaction, client)=>{
    if (!interaction.isSelectMenu()) return;

    let msg = await interaction.channel.messages.fetch(interaction.message.id)

    if (interaction.values[0] === "welcome_message") {

        await interaction.deferUpdate()
        
        const data = await JoinMsg.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {
            await msg.edit("Please send the **MESSAGE** to be setup as the Welcome Message!")
            
            const filter = (m) => m.author.id === interaction.member.id

            const collector = await interaction.channel.createMessageCollector({ filter, time: 60_000 })

            collector.on("collect", async(collected) => {

                let joinMsg = collected.content

            let newData = new JoinMsg({
                JoinMsg: joinMsg,
                GuildID: interaction.guild.id
            })

            newData.save()

            await collector.stop()
            return msg.edit(`Goodbye Message has been set to:\n${joinMsg}`)
        })

        collector.on("end", async(collected) => {
            console.log('Collector Stopped!')
        })
        } else if (data) {
            await JoinMsg.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return msg.edit('Welcome Message has been removed!')
        }
    }
}