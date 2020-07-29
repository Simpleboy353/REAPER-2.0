module.exports.run = async(client, message, args, db) =>{ 
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`⛔ Missing permission: \`Administrator\``); 
    try{ 
        var msg = await message.channel.send(`Locking this channel...`); 
     await message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false 
     }).then(() =>{ 
         msg.edit('🔒 **The Ancients** have locked this channel!'); 
        }); 
    }catch(e){ 
    return message.channel.send(`⛔ Error: `+e) 
}
}