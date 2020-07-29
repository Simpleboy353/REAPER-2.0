const Discord = module.require("discord.js");

module.exports={
    name: "lock",
    description: "Locks a channel",
    run: async(client, message, args) =>{ 
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`⛔ Missing permission: \`Administrator\``); 
    try{ 
        var message = await message.channel.send(`Locking this channel...`); 
     await message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false 
     }).then(() =>{ 
         message.edit('🔒 **The Ancients** have locked this channel!'); 
        }); 
    }catch(e){ 
    return message.channel.send(`⛔ Error: `+e) 
}
}
}