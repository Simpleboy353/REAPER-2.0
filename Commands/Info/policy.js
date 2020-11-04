const Discord = module.require("discord.js")

module.exports = {
  name: "policy",
  description: "Shows the privacy policy for our bot",
  run: async(client, message, args)=>{
    const embed = new Discord.MessageEmbed()
    .setTitle("Infinity Bot Privacy Policy")
    .setDescription("By using the bot you agree to our privacy policy")
    .addField("What data do we store?", `
    We do not collect any personal information relating your account like Passwords or any other Credentials. The data we collect includes the Server IDs, User IDs, Channel IDs and Some Role IDs.The bot never requests for any personal data of the users and any act that breaks the Tos of Discord is discouraged by us!`)
    .addField("Why we need this data?", `
    The data is required for the proper fucntioning of the bot features like logging and autoroles. Without this data, our bot will not be able to perform the logging activities and thus making the features not accessable for users`)
    .addField("How we use the data?", `
    The data is used for the proper functioning for the Logging activities and Autorole features of our Bot. Channel IDs are used to send the messages to the desginated channels and Server IDs to identify the Servers and the Role IDs are used for the Autorole feature`)
    .addField(`How long do we store your data?`, `
    The data is stored as long as the bot is your Server as soon as the bot is kicked or removed from the Server, the data is deleted and is no longer to accessable to anyone`)
    .addField("Who do we share the data with?", `
    We never share your data with anyone except for [MongoDB Inc](https://mongodb.com) which is a DataBase Company and all the data for our Bot is stored on the MongoDB Servers and According to MongoDB Inc. the data is only accessable by us.`)
    .addField("Got Concerns or Queries?", `
    If you have any concerns or queries relating our privacy policy or our bot or if you want to get your data to be removed, Contact [๖ۣۜℜⱥjͥƤuͣtͫ#0001](https://discord.com/users/661501985517862972) directy on our [Support Server](https://discord.gg/mqWprFc)!`)
    .setColor("GREEN")

    return message.channel.send(embed)
  }
}