const Discord = module.require("discord.js");

module.exports = {
  name: "eval",
  description: "Evals JS a code",
  run: async(client, message, args)=>{
    if (message.author.id != "661501985517862972") {
      return message.channel.send("This is an developer only command!")
    }
    const result = eval(content.replace('=eval', ""))
    message.chanel.send(result)
  }
}