const Discord = module.require("discord.js");
const { oneLine } = require("common-tags");

module.exports = {
    name: "userinfo",
    run: async (client, message, args) => {
        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "VIEW_AUDIT_LOG": "View Audit Log",
            "VIEW_GUILD_INSIGHTS": "View Server Insights",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "CREATE_INSTANT_INVITE": "Create Invite",
            "CHANGE_NICKNAME": "Change Nickname",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "VIEW_CHANNEL": "Read Text Channels & See Voice Channels",
            "SEND_MESSAGES": "Send Messages",
            "SEND_TTS_MESSAGES": "Send TTS Messages",
            "MANAGE_MESSAGES": "Manage Messages",
            "EMBED_LINKS": "Embed Links",
            "ATTACH_FILES": "Attach Files",
            "READ_MESSAGE_HISTORY": "Read Message History",
            "MENTION_EVERYONE": "Mention @everyone, @here, and All Roles",
            "USE_EXTERNAL_EMOJIS": "Use External Emojis",
            "ADD_REACTIONS": "Add Reactions",
            "CONNECT": "Connect",
            "SPEAK": "Speak",
            "STREAM": "Video",
            "MUTE_MEMBERS": "Mute Members",
            "DEAFEN_MEMBERS": "Deafen Members",
            "MOVE_MEMBERS": "Move Members",
            "USE_VAD": "Use Voice Activity",
            "PRIORITY_SPEAKER": "Priority Speaker"
        }
        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const act = mention.user.presence.status.toUpperCase();
        const game = mention.user.presence.game || "None";
        const mentionPermissions = mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "": "None",
            "DISCORD_EMPLOYEE": "Discord Employee",
            "DISCORD_PARTNER": "Discord Partner",
            "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
            "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
            "HYPESQUAD_EVENTS": "Hypesquad Events",
            "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
            "HOUSE_BRAVERY": "HypeSquad Bravery",
            "HOUSE_BALANCE": "HypeSquad Balance",
            "EARLY_SUPPORTER": "Early Supporter",
            "TEAM_USER": "Team User",
            "VERIFIED_BOT": "Verified Bot",
            "VERIFIED_DEVELOPER": "Verified Bot Developer"
        };
        var bot = {
            "true": "Yes, The User is a Bot",
            "false": "No, The User is a Human"
        };
        const userlol = new Discord.MessageEmbed()
        .setAuthor(`User Info`, mention.user.avatarURL())
        .setThumbnail(usericon)
        .addField(`General Info`, `Name: \`${mention.user.username}\` \nTag: \`${mention.user.discriminator}\` \nNickname: \`${nick}\``)
        .addField(`Overview`, `Badges: \`${flags[mention.user.flags.toArray().join(", ")]}\` \nStatus: \`${act}\` \nActivity: \`${game}\` \nIs Bot: \`${bot[mention.user.bot]}\``)
        .addField(`Misc Info`, `Roles: <@&${mention._roles.join(">  <@&")}> \nKey Permissions: \`${finalPermissions.join(', ')}\` \nAcc Created on: \n\`${mention.user.createdAt}\` \nJoined This Server on: \n\`${mention.joinedAt}\``)
        .setThumbnail(mention.user.avatarURL())
        .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
        .setTimestamp()
        .setColor("RANDOM");
        message.channel.send(userlol)
    }
}
