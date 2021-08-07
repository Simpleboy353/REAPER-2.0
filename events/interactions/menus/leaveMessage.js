const GoodbyeMsg = require('../../../database/guildData/leavemessage')

module.exports = async(interaction, client)=>{
    if (!interaction.isSelectMenu()) return;

    if (interaction.values[0] === "leave_message") {

        await interaction.deferUpdate()
        
        const data = await GoodbyeMsg.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {
            await interaction.channel.send("Please send the **MESSAGE** to be setup as Goodbye Message!")
            const filter = (m) => m.author.id === interaction.member.id

            const collector = await interaction.channel.createMessageCollector({ filter, time: 60000 })

            collector.on("collect", async(collected) => {

            let goodbyeMsg = collected.content

            let newData = new GoodbyeMsg({
                ByeMsg: goodbyeMsg,
                GuildID: interaction.guild.id
            })

            newData.save()

            await collector.stop()
            return interaction.channel.send(`Goodbye Message has been set to:\n${goodbyeMsg}`)
        })

        collector.on("end", async(collected) => {
            console.log('Collector Stopped!')
        })
        } else if (data) {
            await GoodbyeMsg.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return interaction.channel.send('Goodbye Message has been removed!')
        }
    }
}