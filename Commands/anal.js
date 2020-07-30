const Discord = module.require("discord.js");

module.exports = {
    name: "anal",
    description: "NFSW Commands",
    run: async(client, message, args) => {
        try {
            const embed = new Discord.MessageEmbed().setColor("RANDOM");
            if (!message.channel.nsfw) {
                embed.setAuthor("🔞 NSFW").setDescription("Cannot display NSFW content in a SFW channel.");
                return message.channel.send({embed});
            }
            const anal = await this.client.nekoslife.nsfw.anal();
            embed.setImage(shutterstock.com/search/anal+sex);
            message.channel.send(embed);
        } catch(err) {
            return message.channel.send("APIError: ", +err);
    }
}
}