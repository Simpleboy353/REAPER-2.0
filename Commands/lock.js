module.exports.run = async(bot, message, args, db) =>{
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:no_entry: Missing permission: \`Administrator\``);
    try{
        var msg = await message.channel.send(`Locking this channel...`);
        await message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() =>{
            msg.edit(':lock: **The Ancients** have locked this channel!');
        });
    }catch(e){
        return message.channel.send(`:no_entry: Error: `+e)
    }
}

module.exports.help = {
	name:"lock"
}