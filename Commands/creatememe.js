const Discord = module.require("discord.js");

module.exports = {
    name: "creatememe",
    description: "Create Custom Memes",
    run: async(client, message, args) => {
        message.delete();
        const memetemplate = args[0];
        if (!memetemplate) {
            return message.channel.send("You didn't mention the template!. To see the available meme templates, type `=memetemplates`");
        }
        if (memetemplate !== "sohappy" || "tenguy" || "afraid" || "apcr" || "older" || "aag" || "atis" || "alyt" || "biw" || "stew" || "blb" || "bihw" || "kermit" || "bd" || "ch" || "cb" || "wonka" || "cb" || "gandalf" || "keanu" || "cryingfloor" || "dsm" || "disastergirl" || "live" || "ants" || "dog" || "trump" || "drake" || "ermg" || "facepalm" || "feelsgood" || "firsttry" || "fwp" || "fa" || "fbf" || "fmr" || "fry" || "ggg" || "grumpycat" || "harold" || "hipster" || "icanhas" || "crazypills") {
            return message.channel.send("The mentioned template is not valid! Use `=memetemplates` to see all the available templates!");
        }
        const memetext1 = args[1];
        if (!memetext1) {
            return message.channel.send("Enter the text to be placed at the top!");
        }
        const memetext2 = args[2];
        if (!memetext2) {
            return message.channel.send("Enter the text to be placed at the bottom!");
        }
        message.channel.send({ files: [{ attachment: `https://api.memegen.link/images/${memetemplate}/${memetext1}/${memetext2}`, name: "custommeme.png"}]})
    }, catch (error) {
        const errorlogs = client.channels.cache.get("747750993583669258")
        message.channel.send("Seems like an error has occured!. Please try again in a few hours!")
        errorlogs.send("Error on Creatememe command! \n\nError:\n\n"+error);
    }
}