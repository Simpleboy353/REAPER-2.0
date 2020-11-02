const Discord = module.require("discord.js");

module.exports = {
  name: "eval",
  description: "Evals JS a code",
  run: async(client, message, args)=>{
    if (message.author.id != "661501985517862972") {
      var cmd = args.join(" ")
      if (!cmd) {
        return message.channel.send("What to Eval?");
      } 
      return message.channel.send("This is an developer only command!")
    }
    const result = eval(cmd)
    let embed = new Discord.MessageEmbed()
    .setTitle("Eval")
    .addField(`Input`, cmd)
    .addField(`Output`, result)
    .setColor("GREEN")
    message.chanel.send(embed)
  }
}