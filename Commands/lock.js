const Discord = module.require("discord.js");

module.exports={
    name: "lock",
    description: "Locks a channel",
    run: async(client, message, args) =>{ 
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`⛔ Missing permission: \`Administrator\``); 
    try{ 
     await message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
     }).then(() =>{ 
        }); 
        var message = message.channel.send(`This channel Has been locked by ${message.auhtor.username}`)
    }catch(e){ 
    return message.channel.send(`⛔ Error: `+e) 
}
}
}