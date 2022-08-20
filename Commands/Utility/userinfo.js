const Discord = module.require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    description: "Get info about your account or mentiobned user's account!",
    aliases: ["ui"],
    run: async (client, message, args) => {
        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mention = message.mentions.members.first();
        if (!mention) return message.channel.send("Mention someone!")
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const usericon = mention.user.avatarURL;
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
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
            "EARLY_VERIFIED_DEVELOPER": "Early Verified Bot Developer"
        };
        var bot = {
            "true": "Yes, The User is a Bot",
            "false": "No, The User is a Human"
        };
        const userlol = new Discord.EmbedBuilder()
        .setTitle(`User Info`)
        .addFields([
        { name: `General Info`, value: `Name: \`${mention.user.username}\` \nID:  \`${mention.id}\` \nTag: \`${mention.user.discriminator}\` \nNickname: \`${nick}\``},
        { name: `Overview`, value: `Badges: \`${flags[mention.user.flags.toArray().join(", ")]}\`\nIs Bot: \`${bot[mention.user.bot]}\``},
        { name: `Server Relating Info`, value: `Roles: <@&${mention._roles.join(">  <@&")}> \nKey Permissions: \`${finalPermissions.join(', ')}\``},
        { name: `Misc Info`, value: `Acc Created on: \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \nJoined This Server on: \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``},
        ])
        .setTimestamp()
        .setColor("Random");
        message.channel.send({ embeds: [userlol] })
    }
}
