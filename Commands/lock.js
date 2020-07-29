    const Discord = module.require("discord.js");

    module.exports = {
        name: "lock",
        description: "Locks a channel",
        run: async(client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:no_entry: Missing permission: \`Administrator\``);
    try{
        var message = await message.channel.send(`Starting the Channel Lock Process....`);
        await message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() =>{
            message.edit('The Channel has been Locked up Successfully');
        });
    }catch(e){
        return message.channel.send(`:no_entry: Error: `+e)
    }
}
    }