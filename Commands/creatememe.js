const Discord = module.require("discord.js");

module.exports = {
    name: "creatememe",
    description: "Create Custom Memes",
    run: async(client, message, args) => {
        const memetemplate = args[0];
        if (!memetemplate) {
            return message.channel.send("To see the available meme templates, type `=memetemplates`");
        }
        const memetext1 = args.slice(1).join(" ");
        if (!memetext1) {
            return message.channel.send("Enter the text to be placed at the top!");
        }
        const memetext2 = args.slice(2).join(" ");
        if (!memetext2) {
            return message.channel.send("Enter the text to be placed at the bottom!");
        }
        message.channels.send({ files: [{ attachments: `https://api.memegen.link/images/${memetemplate}/${memetext1}/${memetext2}`, name: "custommeme.js"}]});
    }, catch (error) {
        const errorlogs = client.channels.cache.get("747750993583669258")
        message.channel.send("Seems like an error has occured!. Please try again in a few hours!")
        errorlogs.send("Error on Creatememe command! \n\nError:\n\n"+error);
    }
}