const Discord = module.require ("discord.js");
const client = new Discord.Client();

module.exports = {
    name: "shutdown",
    description: "Shut's down the bot",
    run: async (client, message, args) => {
        let isBotOwner = message.author.id == '661501985517862972';
        if (!isBotOwner) {
            return message.channel.send("This command is developer Only")
        }
        message.channel.send('Shutting down...').then(m => {
            client.destroy();
          });
          await message.channel.send("The Bot has been ShutDown")
    }
}