const Discord = module.require("discord.js")

module.exports = {
  name: "policy",
  description: "Shows the privacy policy for our bot",
  botPerms: ["EmbedLinks"],
  run: async (client, message, args) => {
    const icon = client.user.avatarURL;
    const embed = new Discord.EmbedBuilder()
      .setTitle("INFINITY BOT PRIVACY POLICY")
      .setDescription(`By using the bot you agree to our privacy policy\nRequested by: ${message.author}`)
      .addFields([
        {
        name: "**WHAT DATA DO WE STORE?**",
        value: `
    We do not collect any personal information relating your account like Passwords or any other Credentials. The data we collect includes the User IDs, Server IDs, Channel IDs and Some Role IDs. The bot never requests for any personal data of the users and any act that breaks the Tos of Discord is discouraged by us!`
        },
        {
        name: "**WHY WE NEED THIS DATA?**",
        value: `
    The data is required for the proper functioning of the bot features like Warning System, Logging and Autoroles. Without this data, our bot will not be able to perform these activities and thus making the features inaccessible for users`
        },
        {
        name: "**HOW DO WE USE THIS DATA?**",
        value: `
    The data is used for the proper functioning for theWarning System, Logging activities and Autorole features of our Bot. User IDs are used to identify the users, Channel IDs are used to send the messages to the desginated channels and Server IDs to identify the Servers and the Role IDs are used for the Autorole feature`
        },
        {
        name: `**HOW LONG DO WE STORE YOUR DATA?**`,
        value: `
    The data is stored as long as the bot is in your Server and as soon as the bot is kicked or removed from the Server, the data is deleted and is no longer to accessable to anyone`
        },
        {
        name: "**WHO DO WE SHARE THE DATA WITH**?",
        value: `
    We never share your data with anyone except for [MongoDB Inc](https://mongodb.com) whom is a DataBase Company and all the data for our Bot is stored on the MongoDB Servers and According to MongoDB Inc. the data is only accessable by us.`
        },
        {
        name: "**GOT CONCERNS OR QUERIES?**",
        value: `
    If you have any concerns or queries relating our privacy policy or our bot or if you want your data to be removed, You can contact [๖ۣۜℜⱥjͥƤuͣtͫ#0001](https://discord.com/users/661501985517862972) directy on our [Support Server](https://discord.gg/mqWprFc)!`
        }
      ])
      .setColor("Green");

    return message.channel.send({embeds: [embed]});
  },
};