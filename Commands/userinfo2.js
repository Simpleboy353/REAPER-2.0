const Discord = module.require("discord.js");

module.exports = {
    name: "userinfo2",
    run: async (client, message, args) => {
        const mention = message.mentions.members.first() || message.member;
        const roles = mention.roles.cache.get === null ? "None" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const act = mention.user.presence.status.toUpperCase();
        const game = mention.user.presence.game || "none";
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
        .addField(`General Info`, `Name: \`${mention.user.username}\` \nTag: \`${mention.user.discriminator}\` \nNickname: \`${mention.user.nickname}\``)
        .addField(`Overview`, `Badges: \`${flags[mention.user.flags.toArray().join(", ")]}\` \nStatus: \`${act}\` \nActivity: \`${game}\` \nIs Bot: \`${bot[mention.user.bot]}\``)
        .addField(`Misc Info`, `Roles: ${mention._roles.join(">  <@&")} \nAcc Created on: \n\`${mention.user.createdAt}\` \nJoined This Server on: \n\`${mention.user.joinedAt}\``)
        .setThumbnail(mention.user.avatarURL())
        .setFooter(`${mention.user.id}`, mention.user.avatarURL())
        .setColor("RANDOM");
        message.channel.send(userlol)
    }
}
