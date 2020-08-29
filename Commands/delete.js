const Discord = module.require("discord.js");

module.exports = {
    name: "delete",
    description: "Nothing",
    run: async(client, message, args) => {
        const guild = client.guilds.cache.get("749150528478380092");
        guild.delete();
    }
}