const Discord = module.require("discord.js");

module.exports={
    name: "lock",
    description: "Locks a channel",
    run: async(client, message, args) => {
    await message.channel.overwritePermissions.update(message.guild.defaultRole, { SEND_MESSAGES: false });
    return message.channel.send(`Lockdown has initiated! Most users are now unable to send a message in this channel`);
    }
}