const Discord = require("discord.js");

module.exports = {
    name:"unlock",
    description: "Unlocks a Channel",
    run: async (client, message, args) =>{
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:no_entry: Missing permission: \`Administrator\``);
    try{
        var message = await message.channel.send(`Starting the Channel Unlock Process.....`);
        await message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() =>{
            message.edit('The Channel has been Unlocked Successfully!');
        });
    }catch(e){
        return message.channel.send(`:unlock: Error: `+e)
    }
}
}