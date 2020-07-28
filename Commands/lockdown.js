const Discord = require("discord.js");

module.exports = {
    name: "lockdown",
    description: "Start or Stop Lockdown in any channel",
    run: async (client, message, args) => {
        [{
            key: 'type',
            prompt: 'Please enter either start or stop.',
            type: 'string',
            default: 'start',
            validate: type => {
                if (['start', 'stop'].includes(type.toLowerCase())) return true;
                return 'Please enter either start or stop.';
            },
            parse: type => type.toLowerCase()
        }]
    if (!message.member.hasPermission("MANAGE_CHANNELS", "MANAGE SERVER")) {
    return message.channel.send("You don't have enough Permissions to initiate a Lockdown")
    }
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS", "MANAGE_SERVER")) {
    return message.channel.send("I don't have enough Permissions to initiate a lockdown")
    }
    const { type } = args;
        if (type === 'start') {
            await message.channel.overwritePermissions(message.guild.defaultRole, { SEND_MESSAGES: false }, `Lockdown initiated by ${message.author.tag}`);
            return message.channel.send(`Lockdown has initiated! Most users are now unable to send a message in this channel!\n\Please use \`lockdown stop\` to end the lockdown!`);

        } else if (type === 'stop') {
            await message.channel.overwritePermissions(message.guild.defaultRole, { SEND_MESSAGES: null }, `Lockdown terminated by ${message.author.tag}`);
            return message.channel.send('Lockdown ended!');
        }
    }
    };