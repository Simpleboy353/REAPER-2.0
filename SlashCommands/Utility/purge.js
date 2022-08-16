const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "purge",
    description: "purge",
     botPerms: ["ManageMessages"],
    userPerms: ["ManageMessages"],
   options: [
                {
                    name: 'number',
                    description: '1-100',
                    required: true,
                    type: ApplicationCommandOptionType.Number
                }
            ],
             run: async(client, interaction, args) => {
       const msgnum = interaction.options.getNumber('number')
       await interaction.channel.bulkDelete(msgnum);
       interaction.reply({ content: "Done,If you wish you can delete this", ephemeral: true });
  }
}
