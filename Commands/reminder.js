const Discord = module.require("discord.js");
const ms = require("ms");

module.exports = {
  name: "reminder",
  description: "Set Reminders",
  run: async(client, message, args) => {
  const time = args[0];
  if (!time) {
  return message.channel.send("You didn't enter the time");
  }
  const msg = args.slice(0).join(" ");
  const user = message.author;
  const embed = new Discord.MessageEmbed()
  .setTitle("Success")
  .setDescription(`Remider Set:}\n${msg}\nI will DM you after ${time}`)
  .setColor("RANDOM");
  message.channel.send(embed);

  let dmtime = `${time}`
  setTimeout(function(){
  const dm = new Discord.MessageEmbed()
  .setTitle("Reminder")
  .setTitle(`Its time for ${msg}`)
  .setColor("RANDOM");
  user.send(dm);
 }, ms(dmtime));
}
}
