module.exports = {
    name: "purge",
    description: "purge",
     botPerms: ["MANAGE_MESSAGES"],
    userPerms: ["MANAGE_MESSAGES"],
   options: [
                {
                    name: 'number',
                    description: '1-100',
                    type: "INTEGER"
                }
            ],
             run: async(client, interaction, args) => {
       const msgnum = interaction.options.getInteger('number')
       interaction.reply('Purging...');
       interaction.channel.bulkDelete(msgnum);
    interaction.channel.send("Done,If you wish you can delete this");
  }
}
